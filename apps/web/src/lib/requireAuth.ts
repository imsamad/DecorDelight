import { getServerSession, Session } from "next-auth";
import { authOption } from "./authOption";
import { redirect } from "next/navigation";

export const requireAuth = async (redirectTo: string): Promise<Session> => {
  const session = await getServerSession(authOption);
  if (!session) return redirect(`/login?redirectTo=${redirectTo}`);
  return session;
};
