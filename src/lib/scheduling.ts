import { format } from "date-fns";

export type Service = {
  id: string;
  name: string;
  duration_minutes: number;
  price: number | null;
};

export type Professional = {
  id: string;
  name: string;
};

export type BlockedSlot = {
  blocked_date: string; // yyyy-MM-dd
  start_time: string | null; // null = dia inteiro
  end_time: string | null;
};

export type BookedSlot = {
  professional_id: string;
  appointment_date: string; // yyyy-MM-dd
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
};

// Horário de funcionamento por dia da semana (0 = domingo ... 6 = sábado).
// Ajuste livremente para refletir o horário real do salão.
export const BUSINESS_HOURS: Record<number, { start: string; end: string } | null> = {
  0: null,
  1: { start: "09:00", end: "19:00" },
  2: { start: "09:00", end: "19:00" },
  3: { start: "09:00", end: "19:00" },
  4: { start: "09:00", end: "19:00" },
  5: { start: "09:00", end: "19:00" },
  6: { start: "08:00", end: "17:00" },
};

// Intervalo entre horários exibidos ao cliente.
export const SLOT_STEP_MINUTES = 30;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (totalMinutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Calcula os horários disponíveis para uma data, dado a duração do serviço
 * escolhido e os horários já ocupados daquele profissional.
 */
export function getAvailableSlots(
  date: Date,
  durationMinutes: number,
  booked: BookedSlot[],
  professionalId: string,
  blocked: BlockedSlot[] = [],
): string[] {
  const weekday = date.getDay();
  const hours = BUSINESS_HOURS[weekday];
  if (!hours) return [];

  const startMin = timeToMinutes(hours.start);
  const endMin = timeToMinutes(hours.end);
  const dateStr = format(date, "yyyy-MM-dd");

  const dayBlocks = blocked.filter((b) => b.blocked_date === dateStr);
  // Bloqueio de dia inteiro
  if (dayBlocks.some((b) => !b.start_time || !b.end_time)) return [];

  const busy = booked
    .filter((b) => b.professional_id === professionalId && b.appointment_date === dateStr)
    .map((b) => ({ start: timeToMinutes(b.start_time), end: timeToMinutes(b.end_time) }))
    .concat(
      dayBlocks.map((b) => ({
        start: timeToMinutes(b.start_time as string),
        end: timeToMinutes(b.end_time as string),
      })),
    );

  const now = new Date();
  const isToday = dateStr === format(now, "yyyy-MM-dd");
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots: string[] = [];
  for (let t = startMin; t + durationMinutes <= endMin; t += SLOT_STEP_MINUTES) {
    if (isToday && t <= nowMinutes) continue;
    const slotEnd = t + durationMinutes;
    const overlaps = busy.some((b) => t < b.end && slotEnd > b.start);
    if (!overlaps) slots.push(minutesToTime(t));
  }
  return slots;
}

export function addMinutesToTime(time: string, minutes: number): string {
  return minutesToTime(timeToMinutes(time) + minutes);
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Sob consulta";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m}min`;
}

export const APPOINTMENT_STATUS_LABEL: Record<string, string> = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  concluido: "Concluído",
  cancelado: "Cancelado",
};
