create or replace view public.booked_slots as
select professional_id, appointment_date, start_time, end_time
from public.appointments
where status <> 'cancelado';

grant select on public.booked_slots to anon, authenticated;