import { requireAuth } from "@/lib/requireAuth";

const ProfilePage = async () => {
  const session = await requireAuth("/me");

  return (
    <h1>
      <h1>{JSON.stringify(session, null, 4)}</h1>
    </h1>
  );
};

export default ProfilePage;
