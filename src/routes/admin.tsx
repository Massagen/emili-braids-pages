import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarOff, Loader2, LogOut, Trash2 } from "lucide-react";

import {
  listAppointments,
  updateAppointmentStatus,
  listBlocks,
  createBlock,
  deleteBlock,
} from "@/lib/admin-actions";
import { APPOINTMENT_STATUS_LABEL } from "@/lib/scheduling";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Painel da agenda | Emili Braids" },
      { name: "description", content: "Área administrativa da Emili Braids." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const STATUS_OPTIONS = ["pendente", "confirmado", "concluido", "cancelado"];
const STORAGE_KEY = "emili-admin-pass";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<string | null>(null);
  const [tab, setTab] = useState<"agenda" | "bloqueios">("agenda");
  const [dateFilter, setDateFilter] = useState(format(new Date(), "yyyy-MM-dd"));
  const [loginError, setLoginError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const fetchAppointments = useServerFn(listAppointments);
  const fetchBlocks = useServerFn(listBlocks);
  const mutateStatus = useServerFn(updateAppointmentStatus);
  const addBlock = useServerFn(createBlock);
  const removeBlock = useServerFn(deleteBlock);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setSession(saved);
  }, []);

  const appointmentsQuery = useQuery({
    queryKey: ["admin-appointments", dateFilter],
    enabled: Boolean(session),
    queryFn: () =>
      fetchAppointments({ data: { password: session!, date: dateFilter || undefined } }),
  });

  const blocksQuery = useQuery({
    queryKey: ["admin-blocks"],
    enabled: Boolean(session) && tab === "bloqueios",
    queryFn: () => fetchBlocks({ data: { password: session! } }),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: string }) =>
      mutateStatus({ data: { password: session!, ...vars } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-appointments"] }),
  });

  const createBlockMutation = useMutation({
    mutationFn: (vars: {
      blocked_date: string;
      start_time?: string;
      end_time?: string;
      reason?: string;
    }) => addBlock({ data: { password: session!, ...vars } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-blocks"] }),
  });

  const deleteBlockMutation = useMutation({
    mutationFn: (id: string) => removeBlock({ data: { password: session!, id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-blocks"] }),
  });

  const loginMutation = useMutation({
    mutationFn: async (pass: string) => {
      await fetchAppointments({ data: { password: pass, date: dateFilter } });
      return pass;
    },
    onSuccess: (pass) => {
      sessionStorage.setItem(STORAGE_KEY, pass);
      setSession(pass);
      setLoginError(null);
    },
    onError: (err: Error) => setLoginError(err.message || "Não foi possível entrar."),
  });

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary/40 px-4">
        <Card className="w-[min(380px,100%)] rounded-3xl p-6">
          <h1 className="font-display text-xl font-semibold text-foreground">Painel da agenda</h1>
          <p className="mt-1 text-sm text-muted-foreground">Emili Braids</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate(password);
            }}
          >
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
          </form>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/40 px-4 py-8 md:py-12">
      <div className="mx-auto w-[min(960px,100%)]">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold text-foreground">
              Painel da agenda
            </h1>
            <p className="text-sm text-muted-foreground">Emili Braids</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 gap-2"
            onClick={() => {
              sessionStorage.removeItem(STORAGE_KEY);
              setSession(null);
            }}
          >
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </header>

        <div className="mt-6 flex gap-2 rounded-full bg-background p-1">
          {(["agenda", "bloqueios"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full px-4 py-2 font-button text-sm font-semibold transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "agenda" ? "Agendamentos" : "Dias bloqueados"}
            </button>
          ))}
        </div>

        {tab === "agenda" ? (
          <section className="mt-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Label htmlFor="dateFilter" className="text-xs text-muted-foreground">
                Data
              </Label>
              <Input
                id="dateFilter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-auto"
              />
              {dateFilter ? (
                <Button variant="ghost" size="sm" onClick={() => setDateFilter("")}>
                  Ver todos
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateFilter(format(new Date(), "yyyy-MM-dd"))}
                >
                  Ver hoje
                </Button>
              )}
            </div>

            {appointmentsQuery.isLoading && <LoadingRow />}
            {appointmentsQuery.isError && (
              <ErrorBox message={(appointmentsQuery.error as Error)?.message} />
            )}

            <div className="space-y-3">
              {appointmentsQuery.data?.map((appt) => (
                <Card key={appt.id} className="rounded-2xl p-4">
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-semibold text-foreground">
                        {appt.client_name}
                      </p>
                      <a
                        href={`https://wa.me/55${appt.client_phone.replace(/\D/g, "").replace(/^55/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary underline underline-offset-2"
                      >
                        {appt.client_phone}
                      </a>
                      <p className="mt-2 text-sm text-foreground">
                        {appt.services?.name}
                        {appt.professionals ? ` · ${appt.professionals.name}` : ""}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(`${appt.appointment_date}T00:00:00`), "d 'de' MMMM", {
                          locale: ptBR,
                        })}{" "}
                        · {appt.start_time.slice(0, 5)}–{appt.end_time.slice(0, 5)}
                      </p>
                      {appt.notes && (
                        <p className="mt-1 text-xs italic text-muted-foreground">"{appt.notes}"</p>
                      )}
                    </div>
                    <select
                      value={appt.status}
                      onChange={(e) =>
                        statusMutation.mutate({ id: appt.id, status: e.target.value })
                      }
                      className="h-10 w-full shrink-0 rounded-md border border-input bg-background px-3 text-sm sm:w-auto"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {APPOINTMENT_STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                </Card>
              ))}
              {!appointmentsQuery.isLoading && appointmentsQuery.data?.length === 0 && (
                <EmptyBox text="Nenhum agendamento para essa data." />
              )}
            </div>
          </section>
        ) : (
          <section className="mt-6 space-y-5">
            <Card className="rounded-2xl p-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Bloquear data ou horário
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Deixe os horários em branco para bloquear o dia inteiro.
              </p>
              <form
                className="mt-4 grid gap-3 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const blocked_date = String(fd.get("blocked_date") || "");
                  if (!blocked_date) return;
                  createBlockMutation.mutate({
                    blocked_date,
                    start_time: String(fd.get("start_time") || "") || undefined,
                    end_time: String(fd.get("end_time") || "") || undefined,
                    reason: String(fd.get("reason") || "") || undefined,
                  });
                  e.currentTarget.reset();
                }}
              >
                <div>
                  <Label htmlFor="blocked_date">Data</Label>
                  <Input id="blocked_date" name="blocked_date" type="date" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="reason">Motivo (opcional)</Label>
                  <Input id="reason" name="reason" placeholder="Folga, viagem..." className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="start_time">Início (opcional)</Label>
                  <Input id="start_time" name="start_time" type="time" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="end_time">Fim (opcional)</Label>
                  <Input id="end_time" name="end_time" type="time" className="mt-1" />
                </div>
                <Button
                  type="submit"
                  className="sm:col-span-2"
                  disabled={createBlockMutation.isPending}
                >
                  {createBlockMutation.isPending ? "Bloqueando..." : "Bloquear"}
                </Button>
              </form>
              {createBlockMutation.isError && (
                <ErrorBox message={(createBlockMutation.error as Error)?.message} />
              )}
            </Card>

            {blocksQuery.isLoading && <LoadingRow />}
            {blocksQuery.isError && <ErrorBox message={(blocksQuery.error as Error)?.message} />}

            <div className="space-y-2">
              {blocksQuery.data?.map((b) => (
                <Card
                  key={b.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-4"
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-medium text-foreground">
                      <CalendarOff className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">
                        {format(new Date(`${b.blocked_date}T00:00:00`), "EEEE, d 'de' MMMM", {
                          locale: ptBR,
                        })}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {b.start_time && b.end_time
                        ? `${b.start_time.slice(0, 5)}–${b.end_time.slice(0, 5)}`
                        : "Dia inteiro"}
                      {b.reason ? ` · ${b.reason}` : ""}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remover bloqueio"
                    className="shrink-0"
                    onClick={() => deleteBlockMutation.mutate(b.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
              {!blocksQuery.isLoading && blocksQuery.data?.length === 0 && (
                <EmptyBox text="Nenhum bloqueio cadastrado." />
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function LoadingRow() {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
    </div>
  );
}

function ErrorBox({ message }: { message?: string }) {
  return (
    <p className="mt-3 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
      {message ?? "Ocorreu um erro."}
    </p>
  );
}

function EmptyBox({ text }: { text: string }) {
  return (
    <p className="rounded-2xl bg-background p-6 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}
