import { Card } from "@/components/ui/card";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
      <Card className="md:w-3/4 lg:w-1/3 bg-white shadow-lg">{children}</Card>
    </div>
  );
};

export default AuthLayout;
