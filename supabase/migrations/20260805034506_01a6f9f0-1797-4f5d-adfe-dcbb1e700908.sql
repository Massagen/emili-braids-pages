-- 1. Remove SECURITY DEFINER view, replace with explicit, column-limited functions
DROP VIEW IF EXISTS public.booked_slots;

CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date date, p_professional_id uuid DEFAULT NULL)
RETURNS TABLE (professional_id uuid, appointment_date date, start_time time, end_time time)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.professional_id, a.appointment_date, a.start_time, a.end_time
  FROM public.appointments a
  WHERE a.status <> 'cancelado'
    AND a.appointment_date = p_date
    AND (p_professional_id IS NULL OR a.professional_id = p_professional_id);
$$;

REVOKE ALL ON FUNCTION public.get_booked_slots(date, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_booked_slots(date, uuid) TO anon, authenticated, service_role;

-- 2. blocked_slots: no public table read (hides `reason`); expose only times via function
DROP POLICY IF EXISTS "Public can view blocked slots" ON public.blocked_slots;
REVOKE SELECT ON public.blocked_slots FROM anon;

CREATE OR REPLACE FUNCTION public.get_blocked_slots(p_date date)
RETURNS TABLE (blocked_date date, start_time time, end_time time)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.blocked_date, b.start_time, b.end_time
  FROM public.blocked_slots b
  WHERE b.blocked_date = p_date;
$$;

REVOKE ALL ON FUNCTION public.get_blocked_slots(date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_blocked_slots(date) TO anon, authenticated, service_role;

-- 3. Harden public appointment creation
DROP POLICY IF EXISTS "Anyone can create an appointment" ON public.appointments;

CREATE POLICY "Public can create pending appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pendente'
  AND length(btrim(client_name)) BETWEEN 2 AND 120
  AND length(btrim(client_phone)) BETWEEN 8 AND 20
  AND (notes IS NULL OR length(notes) <= 500)
  AND appointment_date >= (now() AT TIME ZONE 'America/Sao_Paulo')::date
  AND appointment_date <= ((now() AT TIME ZONE 'America/Sao_Paulo')::date + INTERVAL '1 year')
  AND end_time > start_time
  AND service_id IS NOT NULL
  AND professional_id IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.services s WHERE s.id = service_id AND s.active)
  AND EXISTS (SELECT 1 FROM public.professionals p WHERE p.id = professional_id AND p.active)
);