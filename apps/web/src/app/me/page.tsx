import { requireAuth } from '@/lib/requireAuth';
import MyOrdersPage from './orders/page';

const ProfilePage = async () => {
  const session = await requireAuth('/me');

  return (
    <div className='max-w-screen-lg w-full mx-auto'>
      <div className='p-4 text-lg font-semibold italic'>
        Hi, {session.user.fullName}
      </div>
      <MyOrdersPage />
    </div>
  );
};

export default ProfilePage;
