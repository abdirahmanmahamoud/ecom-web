"use server";
import { cookies } from "next/headers";

type SignUpApiType = {
  name: string;
  email: string;
  password: string;
};

export const SignUpApi = async (data: SignUpApiType) => {
  const res = await fetch("http://localhost:4000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    return { status: "error", message: result.message };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", result.user.token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  });

  return { status: "success", message: result.message, user: result.user };
};
