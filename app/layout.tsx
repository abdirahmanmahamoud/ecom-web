import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/provider/Toast";

export const metadata: Metadata = {
  title: "ecom app",
  description: "online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
