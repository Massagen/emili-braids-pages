import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { APPOINTMENT_STATUS_LABEL } from "@/lib/scheduling";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Painel | Emili Braids" }] }),
});

const STATUS_OPTIONS = ["pendente", "confirmado", "concluido", "cancelado"];
// Senha simples para proteger a TELA do painel. Troque por algo só seu.
const ADMIN_PASSWORD = "EmiliBraids2026!";

type AdminAppointment = {
  id: string;
  client_name: string;
  client_phone: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  services: { name: string } | null;
  professionals: { name: string } | null;
};

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [dateFilter, setDateFilter] = useState(format(new Date(), "yyyy-MM-dd"));
  const queryClient = useQueryClient();

  const appointmentsQuery = useQuery({
    queryKey: ["admin-appointments", dateFilter, authed],
    enabled: authed,
    queryFn: async () => {
      let query = supabase
        .from("appointments")
        .select(
          "id, client_name, client_phone, appointment_date, start_time, end_time, status, notes, services(name), professionals(name)",
        )
        .order("appointment_date", { ascending: true })
        .order("start_time", { ascending: true });
      if (dateFilter) query = query.eq("appointment_date", dateFilter);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as AdminAppointment[];
    },
  });

  const statusMutation = useMutation({
    mutationFn: async (vars: { id: string; status: string }) => {
      const { error } = await supabase
        .from("appointments")
        .update({ status: vars.status })
        .eq("id", vars.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-appointments"] }),
  });

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary/30 px-4">
        <Card className="w-[min(360px,100%)] rounded-3xl p-6">
          <h1 className="font-display text-xl font-semibold text-foreground">
            Painel administrativo
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Emili Braids</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === ADMIN_PASSWORD) {
                setAuthed(true);
                setAuthError(false);
              } else {
                setAuthError(true);
              }
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
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            {authError && <p className="text-sm text-destructive">Senha incorreta.</p>}
          </form>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-10">
      <div className="mx-auto w-[min(960px,100%)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-semibold text-foreground">Agendamentos</h1>
          <div className="flex items-center gap-2">
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
            {dateFilter && (
              <Button variant="ghost" size="sm" onClick={() => setDateFilter("")}>
                Ver todos
              </Button>
            )}
          </div>
        </div>

        {appointmentsQuery.isLoading && (
          <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
          </div>
        )}

        {appointmentsQuery.isError && (
          <p className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
            {(appointmentsQuery.error as Error)?.message ?? "Erro ao carregar."}
          </p>
        )}

        <div className="space-y-3">
          {appointmentsQuery.data?.map((appt) => (
            <Card key={appt.id} className="rounded-2xl p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {appt.client_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{appt.client_phone}</p>
                  <p className="mt-2 text-sm text-foreground">
                    {appt.services?.name} {appt.professionals ? `· ${appt.professionals.name}` : ""}
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
                  onChange={(e) => statusMutation.mutate({ id: appt.id, status: e.target.value })}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
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
            <p className="rounded-2xl bg-background p-6 text-center text-sm text-muted-foreground">
              Nenhum agendamento para essa data.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
