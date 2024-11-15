import { Card } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token) {
    return redirect("/");
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
      <Card className="md:w-3/4 lg:w-1/3 bg-white shadow-lg">{children}</Card>
    </div>
  );
};

export default AuthLayout;
