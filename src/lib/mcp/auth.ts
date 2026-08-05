import { auth } from "@lovable.dev/mcp-js";

type RuntimeGlobals = typeof globalThis & {
  Deno?: { env?: { get?: (name: string) => string | undefined } };
  process?: { env?: Record<string, string | undefined> };
};

function env(name: string): string | undefined {
  const runtime = globalThis as RuntimeGlobals;
  return (runtime.Deno?.env?.get?.(name) ?? runtime.process?.env?.[name])?.trim() || undefined;
}

/**
 * O servidor MCP exige OAuth: só chamadas com um token válido emitido pelo
 * provedor de autenticação do projeto são aceitas. Sem token, o servidor
 * responde 401 com o desafio de autorização.
 */
export function mcpAuth() {
  const supabaseUrl = env("SUPABASE_URL") ?? env("VITE_SUPABASE_URL") ?? "";
  return auth.oauth.issuer({
    issuer: `${supabaseUrl.replace(/\/+$/, "")}/auth/v1`,
    acceptedAudiences: ["authenticated"],
    resourceName: "Emili's Elegance",
  });
}