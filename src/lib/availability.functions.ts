import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  professionalId: z.string().uuid(),
  durationMinutes: z.number().int().min(15).max(720),
});

/** Retorna apenas os horários livres — nenhum dado de cliente é exposto. */
export const getAvailability = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { fetchAvailableSlots } = await import("@/lib/availability.server");
    return fetchAvailableSlots(data);
  });