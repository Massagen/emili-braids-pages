import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { addMinutesToTime } from "@/lib/scheduling";
import { fetchAvailableSlots } from "@/lib/availability.server";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "create_appointment",
  title: "Criar agendamento",
  description:
    "Cria um agendamento (status 'pendente') para uma cliente em um horário livre. Confirme antes com check_availability.",
  inputSchema: {
    client_name: z.string().trim().min(2).describe("Nome da cliente."),
    client_phone: z.string().trim().min(8).describe("Telefone/WhatsApp da cliente."),
    service_id: z.string().uuid().describe("ID do serviço (veja list_services)."),
    date: z.string().describe("Data no formato AAAA-MM-DD."),
    start_time: z.string().describe("Horário de início no formato HH:MM."),
    professional_id: z.string().uuid().optional().describe("ID da profissional (opcional)."),
    notes: z.string().trim().optional().describe("Observações da cliente."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  handler: async ({ client_name, client_phone, service_id, date, start_time, professional_id, notes }) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new ToolError("Data deve estar no formato AAAA-MM-DD.");
    if (!/^\d{2}:\d{2}$/.test(start_time)) throw new ToolError("Horário deve estar no formato HH:MM.");
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

    const slots = await fetchAvailableSlots({
      date,
      professionalId: professionalId!,
      durationMinutes: service.duration_minutes,
    });
    if (!slots.includes(start_time)) {
      throw new ToolError(
        `Horário ${start_time} indisponível. Livres: ${slots.length ? slots.join(", ") : "nenhum nesta data"}.`,
      );
    }

    const end_time = addMinutesToTime(start_time, service.duration_minutes);
    const { error } = await supabase.from("appointments").insert({
      client_name,
      client_phone,
      professional_id: professionalId,
      service_id: service.id,
      appointment_date: date,
      start_time,
      end_time,
      notes: notes ?? null,
    });
    if (error) throw new ToolError(error.message);

    return {
      content: [
        {
          type: "text",
          text: `Agendamento criado para ${client_name}: ${service.name} em ${date} das ${start_time} às ${end_time} (status pendente).`,
        },
      ],
      structuredContent: {
        service: service.name,
        date,
        start_time,
        end_time,
        status: "pendente",
      },
    };
  },
});