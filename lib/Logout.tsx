"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const useLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return redirect("/");
};
