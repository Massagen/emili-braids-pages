import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  getAvailableSlots,
  type BlockedSlot,
  type BookedSlot,
} from "@/lib/scheduling";

/**
 * Consulta de disponibilidade feita apenas no servidor.
 * As funções get_booked_slots / get_blocked_slots não são executáveis
 * por anon/authenticated — só o service_role pode chamá-las.
 */
function adminClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export async function fetchAvailableSlots(input: {
  date: string; // yyyy-MM-dd
  professionalId: string;
  durationMinutes: number;
}): Promise<string[]> {
  const supabase = adminClient();
  const [booked, blocked] = await Promise.all([
    supabase.rpc("get_booked_slots", {
      p_date: input.date,
      p_professional_id: input.professionalId,
    }),
    supabase.rpc("get_blocked_slots", { p_date: input.date }),
  ]);
  if (booked.error) throw new Error(booked.error.message);
  if (blocked.error) throw new Error(blocked.error.message);

  return getAvailableSlots(
    new Date(`${input.date}T00:00:00`),
    input.durationMinutes,
    (booked.data ?? []) as BookedSlot[],
    input.professionalId,
    (blocked.data ?? []) as BlockedSlot[],
  );
}