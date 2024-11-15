import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import AvatarProfile from "./AvatarProfile";

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return (
    <div className="w-full h-14 bg-white px-[4%] lg:px-[8%] flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        <span className="text-blue-800 font-serif">E</span>
        <span>com</span>
      </Link>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="text-lg font-semibold hover:text-blue-800 hover:font-bold"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-lg font-semibold hover:text-blue-800 hover:font-bold"
          >
            Product
          </Link>
          <Link
            href="/card"
            className="text-lg font-semibold hover:text-blue-800 hover:font-bold"
          >
            Card
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {token ? (
            <AvatarProfile />
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/signup"
                className="text-lg font-semibold hover:text-blue-800 hover:font-bold"
              >
                Sing Up
              </Link>
              <Button className="px-5 py-2" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
