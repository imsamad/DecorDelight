import { requireAuth } from "@/lib/requireAuth";
import MyOrdersPage from "./orders/page";
import { PageWrapper } from "@/components/PageWrapper";

const ProfilePage = async () => {
  const session = await requireAuth("/me");

  return (
    <PageWrapper>
      <div className="p-4 text-lg font-semibold italic">
        Hi, {session.user.fullName}
      </div>
      <MyOrdersPage wrapInPage={false} />
    </PageWrapper>
  );
};

export default ProfilePage;
