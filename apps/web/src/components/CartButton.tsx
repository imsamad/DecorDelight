'use client';
import React from 'react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const CartButton = () => {
  const router = useRouter();
  return <DropdownMenuItem>My Cart</DropdownMenuItem>;
};

export default CartButton;
