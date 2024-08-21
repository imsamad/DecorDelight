import { Navbar } from "@/components/Navbar";
import "./global.css";
import { NextAuthWrapper } from "./NextAuthWrapper";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-screen overflow-x-hidden min-h-screen overflow-y-auto bg-gray-100/40 border-t-2 border-t-cyan-700">
        <NextAuthWrapper>
          <Navbar />
          {/* mt-20 md:mt-20  */}
          <div className="min-h-[calc(90vh)]">{children}</div>
          <Footer />
        </NextAuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
