"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogInIcon, LogOut, Plus, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingButton from "./LoadingButton";

export const Navbar = () => {
  const { status } = useSession();
  return (
    <div className="w-full bg-blue-300 px-8 py-6 flex justify-between items-center">
      <Link href="/">
        <h2 className="text-blue-700 mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Hello
        </h2>
      </Link>

      <div className="flex gap-2 items-center">
        {status == "authenticated" ? (
          <>
            <Link href="/carts">
              <Button size="sm" variant="outline">
                <ShoppingCart />
              </Button>
            </Link>
            <Link href="/orders">
              <Button size="sm" variant="outline">
                Orders
              </Button>
            </Link>
            <Link href="/me/products/create">
              <Button size="sm" variant="outline" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Product
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 -translate-x-8 ">
                <Link href="/me">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button size="sm" variant="outline">
                <LogInIcon />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
