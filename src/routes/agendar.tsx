import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, Loader2, ChevronLeft } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  getAvailableSlots,
  formatPrice,
  formatDuration,
  addMinutesToTime,
  type Service,
  type Professional,
  type BookedSlot,
  type BlockedSlot,
} from "@/lib/scheduling";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WHATSAPP_URL, WHATSAPP_PHONE } from "@/lib/whatsapp";

const TITLE = "Agendar horário | Emili Braids";

export const Route = createFileRoute("/agendar")({
  component: AgendarPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Agende seu horário na Emili Braids." },
    ],
  }),
});

type Step = 1 | 2 | 3 | 4 | 5;

function AgendarPage() {
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<Service | null>(null);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, duration_minutes, price")
        .eq("active", true)
        .order("name");
      if (error) throw error;
      return data as Service[];
    },
  });

  const professionalsQuery = useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("id, name")
        .eq("active", true)
        .order("name");
      if (error) throw error;
      return data as Professional[];
    },
  });

  // Se houver só um profissional ativo, seleciona automaticamente.
  useEffect(() => {
    if (professionalsQuery.data?.length === 1) setProfessional(professionalsQuery.data[0]);
  }, [professionalsQuery.data]);

  const fetchAvailability = useServerFn(getAvailability);

  const slotsQuery = useQuery({
    queryKey: [
      "available_slots",
      professional?.id,
      service?.id,
      date ? format(date, "yyyy-MM-dd") : null,
    ],
    enabled: Boolean(professional && date && service),
    queryFn: async () =>
      fetchAvailability({
        data: {
          date: format(date!, "yyyy-MM-dd"),
          professionalId: professional!.id,
          durationMinutes: service!.duration_minutes,
        },
      }),
  });

  const availableSlots = useMemo(() => slotsQuery.data ?? [], [slotsQuery.data]);

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!service || !professional || !date || !time) throw new Error("Dados incompletos.");
      const end_time = addMinutesToTime(time, service.duration_minutes);
      const { error } = await supabase.from("appointments").insert({
        client_name: clientName.trim(),
        client_phone: clientPhone.trim(),
        professional_id: professional.id,
        service_id: service.id,
        appointment_date: format(date, "yyyy-MM-dd"),
        start_time: time,
        end_time,
        notes: notes.trim() || null,
        status: "pendente",
      });
      if (error) throw error;
    },
    onSuccess: () => setConfirmed(true),
  });

  const canGoStep2 = Boolean(service);
  const canGoStep3 = Boolean(date && professional);
  const canGoStep4 = Boolean(time);
  const canSubmit = clientName.trim().length > 1 && clientPhone.trim().length >= 8;

  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-16 md:py-24">
      <div className="mx-auto w-[min(720px,100%)]">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">
            Agendamento online
          </span>
          <h1 className="mt-5 font-display text-3xl font-medium leading-tight text-foreground md:text-4xl">
            Marque seu horário na{" "}
            <em className="font-normal italic text-brand-gradient">Emili Braids</em>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Prefere falar direto?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Agende pelo WhatsApp
            </a>
          </p>
        </div>

        <Card className="rounded-3xl p-6 shadow-sm md:p-8">
          {confirmed ? (
            <ConfirmationView
              service={service!}
              professional={professional!}
              date={date!}
              time={time!}
              clientName={clientName}
              onNewBooking={() => {
                setStep(1);
                setService(null);
                setDate(undefined);
                setTime(null);
                setClientName("");
                setClientPhone("");
                setNotes("");
                setConfirmed(false);
              }}
            />
          ) : (
            <>
              <StepHeader step={step} />

              {step === 1 && (
                <div className="space-y-3">
                  {servicesQuery.isLoading && <LoadingRow />}
                  {servicesQuery.data?.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors hover:border-primary hover:bg-primary/5 ${
                        service?.id === s.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDuration(s.duration_minutes)}
                        </p>
                      </div>
                      <span className="font-button text-sm font-bold text-primary">
                        {formatPrice(s.price)}
                      </span>
                    </button>
                  ))}
                  {!servicesQuery.isLoading && servicesQuery.data?.length === 0 && (
                    <EmptyState text="Nenhum serviço disponível no momento. Fale pelo WhatsApp." />
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {professionalsQuery.data && professionalsQuery.data.length > 1 && (
                    <div>
                      <Label className="mb-2 block">Profissional</Label>
                      <div className="flex flex-wrap gap-2">
                        {professionalsQuery.data.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setProfessional(p)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              professional?.id === p.id
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary"
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="mb-2 block">Escolha a data</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={{ before: new Date() }}
                      locale={ptBR}
                      className="rounded-2xl border"
                    />
                  </div>
                  <StepNav
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                    nextDisabled={!canGoStep3}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {(bookedQuery.isLoading || blockedQuery.isLoading) && <LoadingRow />}
                  {!bookedQuery.isLoading && !blockedQuery.isLoading && availableSlots.length === 0 && (
                    <EmptyState text="Sem horários livres nesse dia. Escolha outra data." />
                  )}
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setTime(slot);
                          setStep(4);
                        }}
                        className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                          time === slot
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <StepNav
                    onBack={() => setStep(2)}
                    onNext={() => setStep(4)}
                    nextDisabled={!canGoStep4}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Nome completo</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Seu nome"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">WhatsApp</Label>
                    <Input
                      id="clientPhone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(27) 99999-9999"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: primeira vez, alergia a algum produto..."
                      className="mt-1"
                    />
                  </div>

                  <SummaryBox
                    service={service}
                    professional={professional}
                    date={date}
                    time={time}
                  />

                  {submitMutation.isError && (
                    <p className="text-sm text-destructive">
                      Não foi possível confirmar. Tente novamente ou fale pelo WhatsApp.
                    </p>
                  )}

                  <StepNav
                    onBack={() => setStep(3)}
                    onNext={() => submitMutation.mutate()}
                    nextDisabled={!canSubmit || submitMutation.isPending}
                    nextLabel={
                      submitMutation.isPending ? "Confirmando..." : "Confirmar agendamento"
                    }
                  />
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </main>
  );
}

function StepHeader({ step }: { step: Step }) {
  const labels = ["Serviço", "Data", "Horário", "Seus dados"];
  return (
    <div className="mb-6 flex items-center gap-2">
      {labels.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : n}
            </div>
            <span
              className={`hidden text-xs font-medium sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </span>
            {n < labels.length && <div className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continuar",
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <Button variant="ghost" onClick={onBack} className="gap-1">
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Button>
      <Button onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </Button>
    </div>
  );
}

function SummaryBox({
  service,
  professional,
  date,
  time,
}: {
  service: Service | null;
  professional: Professional | null;
  date: Date | undefined;
  time: string | null;
}) {
  if (!service || !date || !time) return null;
  return (
    <div className="rounded-2xl bg-secondary/60 p-4 text-sm">
      <p className="font-display text-base font-semibold text-foreground">{service.name}</p>
      <p className="mt-1 text-muted-foreground">
        {professional ? `${professional.name} · ` : ""}
        {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })} às {time}
      </p>
    </div>
  );
}

function ConfirmationView({
  service,
  professional,
  date,
  time,
  clientName,
  onNewBooking,
}: {
  service: Service;
  professional: Professional;
  date: Date;
  time: string;
  clientName: string;
  onNewBooking: () => void;
}) {
  const dateLabel = format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
  const message = `Olá! Sou ${clientName}, acabei de agendar ${service.name} para ${dateLabel} às ${time} pelo site. Pode confirmar? 😊`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
        Agendamento recebido!
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {service.name} com {professional.name} em {dateLabel} às {time}.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Seu horário está como <strong>pendente</strong> até a confirmação do salão.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button onClick={onNewBooking} variant="outline">
          Fazer outro agendamento
        </Button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button>Confirmar pelo WhatsApp</Button>
        </a>
      </div>
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-2xl bg-secondary/60 p-4 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}
