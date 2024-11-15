"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/lib/Logout";
import Link from "next/link";

export type userType = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  expires: string;
};

const AvatarProfile = () => {
  const user: userType = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await useLogout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-black text-white cursor-pointer">
          <AvatarFallback className="bg-black text-white">
            {user.name.split(" ")[0].charAt(0).toLocaleUpperCase()}
            {user.name.split(" ")[1]?.charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mr-20 px-2">
        <h2 className="text-base font-medium leading-4">{user.name}</h2>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/order">My Order</Link>
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarProfile;
