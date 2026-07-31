CREATE TABLE public.professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  price numeric(10,2),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_phone text NOT NULL,
  professional_id uuid REFERENCES public.professionals(id) ON DELETE SET NULL,
  service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','confirmado','concluido','cancelado')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointments_date_professional ON public.appointments (appointment_date, professional_id);

GRANT SELECT ON public.professionals TO anon, authenticated;
GRANT ALL ON public.professionals TO service_role;

GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;

GRANT INSERT ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO service_role;

ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active professionals"
  ON public.professionals FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can view active services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Anyone can create an appointment"
  ON public.appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

INSERT INTO public.professionals (name) VALUES ('Emili Braids');

INSERT INTO public.services (name, duration_minutes, price) VALUES
  ('Box Braids', 240, 250.00),
  ('Nagô', 180, 150.00),
  ('Twist', 210, 200.00),
  ('Crochet Braids', 150, 180.00),
  ('Cachos', 90, 120.00),
  ('Manutenção', 60, 80.00),
  ('Cursos', 480, 600.00),
  ('Workshops', 360, 400.00);