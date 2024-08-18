import { Navbar } from "@/components/Navbar";
import "./global.css";
import { NextAuthWrapper } from "./NextAuthWrapper";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-screen overflow-x-hidden min-h-screen overflow-y-auto">
        <NextAuthWrapper>
          <Navbar />
          {children}
        </NextAuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
