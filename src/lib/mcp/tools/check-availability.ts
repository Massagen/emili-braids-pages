import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getAvailableSlots } from "@/lib/scheduling";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "check_availability",
  title: "Ver horários disponíveis",
  description:
    "Retorna os horários livres em uma data para um serviço, considerando agendamentos existentes e bloqueios da agenda.",
  inputSchema: {
    service_id: z.string().uuid().describe("ID do serviço (veja list_services)."),
    date: z.string().describe("Data no formato AAAA-MM-DD."),
    professional_id: z
      .string()
      .uuid()
      .optional()
      .describe("ID da profissional. Se omitido, usa a primeira profissional ativa."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ service_id, date, professional_id }) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new ToolError("Data deve estar no formato AAAA-MM-DD.");
    const supabase = supabaseAnon();

    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("id,name,duration_minutes")
      .eq("id", service_id)
      .eq("active", true)
      .maybeSingle();
    if (serviceError) throw new ToolError(serviceError.message);
    if (!service) throw new ToolError("Serviço não encontrado ou inativo.");

    let professionalId = professional_id;
    if (!professionalId) {
      const { data: pro, error: proError } = await supabase
        .from("professionals")
        .select("id")
        .eq("active", true)
        .order("name")
        .limit(1)
        .maybeSingle();
      if (proError) throw new ToolError(proError.message);
      if (!pro) throw new ToolError("Nenhuma profissional ativa cadastrada.");
      professionalId = pro.id;
    }

    const [{ data: booked, error: bookedError }, { data: blocked, error: blockedError }] =
      await Promise.all([
        supabase
          .from("booked_slots")
          .select("professional_id,appointment_date,start_time,end_time")
          .eq("appointment_date", date),
        supabase
          .from("blocked_slots")
          .select("blocked_date,start_time,end_time")
          .eq("blocked_date", date),
      ]);
    if (bookedError) throw new ToolError(bookedError.message);
    if (blockedError) throw new ToolError(blockedError.message);

    const slots = getAvailableSlots(
      new Date(`${date}T00:00:00`),
      service.duration_minutes,
      booked ?? [],
      professionalId!,
      blocked ?? [],
    );

    return {
      content: [
        {
          type: "text",
          text:
            slots.length > 0
              ? `Horários livres em ${date} para ${service.name}: ${slots.join(", ")}`
              : `Nenhum horário livre em ${date} para ${service.name}.`,
        },
      ],
      structuredContent: {
        date,
        service_id: service.id,
        professional_id: professionalId,
        duration_minutes: service.duration_minutes,
        slots,
      },
    };
  },
});