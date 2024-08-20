'use client';
import React from 'react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';

export const LogoutDropdownMenuItem = () => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => {
        fetcher('/auth/logut', 'DELETE').finally(() => {
          signOut();
          router.refresh();
        });
      }}
    >
      <LogOut className='w-5 h-5 mr-2' />
      Logout
    </DropdownMenuItem>
  );
};
