"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const fromSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, "Password Is Required"),
});

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const from = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof fromSchema>) => {
    setLoading(true);
    console.log(value);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Login ecom app</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...from}>
          <form onSubmit={from.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={from.control}
              name="email"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={from.control}
              name="password"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    {...field}
                    placeholder="Enter your password"
                    type="password"
                    disabled={loading}
                  />
                  <FormMessage />
                </div>
              )}
            />
            <div className="pt-3">
              <Button
                className={cn(
                  "w-full hover:bg-black/75",
                  loading && "bg-black/55"
                )}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-base">
        Don&apos;t have an account?
        <Link href="/auth/signup" className="text-blue-600 underline ml-1">
          Sing up
        </Link>
      </CardFooter>
    </>
  );
};

export default LoginPage;
