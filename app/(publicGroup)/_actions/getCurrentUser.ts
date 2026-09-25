import { cookies } from "next/headers";

type CurrentUser = { id: string; role?: string } | null;

export async function getCurrentUser(): Promise<CurrentUser> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const payloadBase64 = accessToken.split(".")[1];
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64").toString("utf-8"),
    );
    return { id: payload.id ?? payload.userId, role: payload.role };
  } catch {
    return null;
  }
}
