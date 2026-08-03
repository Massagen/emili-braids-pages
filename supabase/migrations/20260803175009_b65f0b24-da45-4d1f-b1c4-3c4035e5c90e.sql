CREATE TABLE public.blocked_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid REFERENCES public.professionals(id) ON DELETE CASCADE,
  blocked_date date NOT NULL,
  start_time time,
  end_time time,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blocked_slots TO anon, authenticated;
GRANT ALL ON public.blocked_slots TO service_role;

ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blocked slots"
  ON public.blocked_slots FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX blocked_slots_date_idx ON public.blocked_slots (blocked_date, professional_id);

-- Fecha leitura/edição pública dos agendamentos (só o painel via servidor acessa)
DROP POLICY IF EXISTS "public can read appointments" ON public.appointments;
DROP POLICY IF EXISTS "public can update appointments" ON public.appointments;