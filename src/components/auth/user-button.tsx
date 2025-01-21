"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "@/components/auth/logout-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Headset } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

export function UserButton() {
  const user = useCurrentUser();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar>
            {/* @ts-expect-error Just ts being ts */}
            <AvatarImage src={user?.image} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((char) => char[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 text-center">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Avatar className="h-20 w-20 mx-auto">
            {/* @ts-expect-error Just ts being ts */}
            <AvatarImage src={user?.image} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((char) => char[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <p className="font-bold text-xl">Hi, {user?.name}</p>
          <Link href="/auth/account">
            <p className="text-sm border p-2 m-1 rounded-full text-blue-500 hover:text-blue-500/50 transition-colors duration-100">
              Manage your Account
            </p>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/support">
          <DropdownMenuItem className="cursor-pointer">
            <Headset className="h-4 w-4 mr-2" />
            Support
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
