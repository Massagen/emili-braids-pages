import { defineMcp } from "@lovable.dev/mcp-js";
import checkAvailabilityTool from "./tools/check-availability";
import createAppointmentTool from "./tools/create-appointment";
import listProfessionalsTool from "./tools/list-professionals";
import listServicesTool from "./tools/list-services";

export default defineMcp({
  name: "emili-s-elegance",
  title: "Emili's Elegance",
  version: "0.1.0",
  instructions:
    "Ferramentas do salão Emili Braids (tranças afro, Vitória-ES). Use `list_services` e `list_professionals` para conhecer o catálogo, `check_availability` para ver horários livres em uma data e `create_appointment` para reservar um horário. Nenhuma ferramenta expõe dados de outras clientes.",
  tools: [listServicesTool, listProfessionalsTool, checkAvailabilityTool, createAppointmentTool],
});