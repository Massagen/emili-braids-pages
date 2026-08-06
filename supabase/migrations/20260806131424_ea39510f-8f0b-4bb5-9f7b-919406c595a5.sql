REVOKE EXECUTE ON FUNCTION public.get_booked_slots(date, uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_blocked_slots(date) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_booked_slots(date, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_blocked_slots(date) TO service_role;