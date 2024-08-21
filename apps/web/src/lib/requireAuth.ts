import { getServerSession, Session } from "next-auth";
import { authOption } from "./authOption";
import { redirect } from "next/navigation";

export const requireAuth = async (redirectTo: string): Promise<Session> => {
  const session = await getServerSession(authOption);

  if (!session) return redirect(`/login?redirectTo=${redirectTo}`);
  return session;
};

export const requireAdmin = async (redirectTo: string): Promise<Session> => {
  const session = await getServerSession(authOption);
  if (!session) return redirect(`/login?redirectTo=${redirectTo}`);
  if (session?.user.role == "USER") return redirect(`/me`);

  return session;
};
