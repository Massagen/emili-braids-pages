## Objetivo

Ativar o Lovable Cloud (backend com banco Postgres) e criar a estrutura de agendamentos, com dados iniciais da Emili Braids.

## Etapas

1. **Ativar Lovable Cloud** — provisiona o banco de dados do projeto (sem contas externas).

2. **Migração de schema** — uma migração criando:
   - `professionals`: `id uuid pk default gen_random_uuid()`, `name text not null`, `active boolean default true`, `created_at timestamptz default now()`
   - `services`: `id`, `name text not null`, `duration_minutes int default 60`, `price numeric(10,2)`, `active boolean default true`, `created_at`
   - `appointments`: `id`, `client_name text not null`, `client_phone text not null`, `professional_id uuid references professionals(id)`, `service_id uuid references services(id)`, `appointment_date date not null`, `start_time time not null`, `end_time time not null`, `status text default 'pendente'` com CHECK em (pendente/confirmado/concluido/cancelado), `notes text`, `created_at`

3. **Permissões (GRANTs + RLS)** — na mesma migração:
   - `professionals` / `services`: `GRANT SELECT` a `anon` e `authenticated`; RLS ativa; política de SELECT pública apenas `USING (active = true)`.
   - `appointments`: `GRANT INSERT` a `anon` e `authenticated` (sem SELECT/UPDATE/DELETE públicos); RLS ativa; apenas uma política de INSERT `WITH CHECK (true)`. Nenhuma política de leitura/edição pública — a leitura ficará restrita a acesso administrativo no servidor.
   - `service_role` com `GRANT ALL` nas três tabelas.
   - Índice em `appointments (appointment_date, professional_id)` para consulta de disponibilidade.

4. **Dados iniciais** — INSERTs literais na mesma migração: profissional "Emili Braids" e os 8 serviços com duração/preço informados.

## Observações técnicas

- Nenhuma alteração de UI nesta etapa: a landing page permanece como está. O formulário de agendamento conectado a essas tabelas fica para um passo seguinte, se você quiser.
- `status` usa `text` + CHECK (em vez de enum) para facilitar ajustes futuros de valores.
- Como não há leitura pública em `appointments`, um painel administrativo futuro exigirá login e políticas por papel (role).
