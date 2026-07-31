import { createServerFn } from "@tanstack/react-start";

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD não configurada no servidor.");
  }
  if (password !== expected) {
    throw new Error("Senha incorreta.");
  }
}

export type AdminAppointment = {
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

export const listAppointments = createServerFn({ method: "POST" })
  .validator((data: { password: string; date?: string }) => data)
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let query = supabaseAdmin
      .from("appointments")
      .select(
        "id, client_name, client_phone, appointment_date, start_time, end_time, status, notes, services(name), professionals(name)",
      )
      .order("appointment_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (data.date) {
      query = query.eq("appointment_date", data.date);
    }

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as AdminAppointment[];
  });

export const updateAppointmentStatus = createServerFn({ method: "POST" })
  .validator((data: { password: string; id: string; status: string }) => data)
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("appointments")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
