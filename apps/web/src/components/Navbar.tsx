import { LogInIcon, Search, ShoppingCart, UserCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/authOption';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutDropdownMenuItem } from './LogoutDropdownMenuItem';
import CartButton from './CartButton';

export const Navbar = async () => {
  const session = await getServerSession(authOption);

  const isLoggedIn = !!session?.user.id;

  return (
    <nav className='bg-transparent  backdrop-blur-md fixed  top-0 left-0 right-0 z-50 px-6 py-4 border-0 border-b-slate-200'>
      <div className='container mx-auto flex justify-between items-center p-0'>
        <div className='text-2xl font-bold mix-blend-difference'>
          <Link href='/'>DecorDelight</Link>
        </div>

        <div className='flex-1 max-w-lg hidden md:block'>
          <SearchBar />
        </div>

        <div className='flex items-center gap-2'>
          <Link href='/products' className=''>
            <Button variant='ghost' size='sm'>
              All Products
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href='/cart' className=''>
                <Button variant='ghost' size='sm'>
                  <ShoppingCart className='w-5 h-5 mr-2' />
                  My Cart
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className='rounded-full'>
                  <UserCircleIcon className='w-8 h-8' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className=' -translate-x-5 '>
                  <DropdownMenuLabel>
                    <Link className='flex items-center' href='/me'>
                      <UserCircleIcon className='w-5 h-5 mr-2' />
                      My Profile
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className='flex items-center' href='/me/orders'>
                      {session.user.role == 'ADMIN' ? 'All' : 'My'} Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/cart'>My Cart</Link>
                  </DropdownMenuItem>
                  {session.user.role == 'ADMIN' ? (
                    <DropdownMenuItem>
                      <Link className='flex items-center' href='/me/products'>
                        All Products
                      </Link>
                    </DropdownMenuItem>
                  ) : null}

                  <DropdownMenuSeparator />

                  <LogoutDropdownMenuItem />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href='/me'>
                <Button variant='default' size='sm'>
                  <LogInIcon className='w-4 h-4 mr-2' /> Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* <div className='container mx-auto  mt-4 justify-center items-center p-0 block md:hidden'>
        <SearchBar />
      </div> */}
    </nav>
  );
};

const SearchBar = () => {
  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Search...'
        className='w-full py-2 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500' />
    </div>
  );
};
