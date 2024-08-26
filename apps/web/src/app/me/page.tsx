import { requireAuth } from '@/lib/requireAuth';
import MyOrdersPage from './orders/page';
import { PageWrapper } from '@/components/PageWrapper';
////export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const session = await requireAuth('/me');

  return (
    <PageWrapper>
      <div className='p-4 text-lg font-semibold italic'>
        Hi, {session.user.fullName}
      </div>
      <MyOrdersPage wrapInPage={false} />
    </PageWrapper>
  );
};

export default ProfilePage;
