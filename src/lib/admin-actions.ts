import { createServerFn } from "@tanstack/react-start";

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

export type AdminBlock = {
  id: string;
  blocked_date: string;
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
};

export const listAppointments = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; date?: string }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./admin.server");
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let query = supabaseAdmin
      .from("appointments")
      .select(
        "id, client_name, client_phone, appointment_date, start_time, end_time, status, notes, services(name), professionals(name)",
      )
      .order("appointment_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (data.date) query = query.eq("appointment_date", data.date);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as AdminAppointment[];
  });

export const updateAppointmentStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; id: string; status: string }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./admin.server");
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("appointments")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listBlocks = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./admin.server");
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("blocked_slots")
      .select("id, blocked_date, start_time, end_time, reason")
      .gte("blocked_date", new Date().toISOString().slice(0, 10))
      .order("blocked_date", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as AdminBlock[];
  });

export const createBlock = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      password: string;
      blocked_date: string;
      start_time?: string | null;
      end_time?: string | null;
      reason?: string | null;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./admin.server");
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("blocked_slots").insert({
      blocked_date: data.blocked_date,
      start_time: data.start_time || null,
      end_time: data.end_time || null,
      reason: data.reason || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteBlock = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; id: string }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./admin.server");
    assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("blocked_slots").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
