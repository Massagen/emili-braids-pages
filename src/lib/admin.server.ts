export function assertAdmin(password: string) {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) throw new Error("ADMIN_PASSWORD não configurada no servidor.");
  if (password !== expected) throw new Error("Senha incorreta.");
}
