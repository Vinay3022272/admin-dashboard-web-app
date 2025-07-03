import './output.css'

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from '@/components/SessionWrapper';

export const metadata = {
  title: "Admin Dashboard",
  description:
    "This website is a funding platform if someone wanna get funds or any monetary transaction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] text-white">
        <SessionWrapper>
        <Navbar />
        <div className="min-h-screen  bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] text-white">
  
        {children}
        </div>
          
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
