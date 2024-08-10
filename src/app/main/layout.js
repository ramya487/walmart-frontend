import { Inter } from "next/font/google";
import "../globals.css"
import Navbar from "@/components/Navbar";
import Section1 from "@/components/Section1";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Section1 />
        {children}
      </body>
    </html>
  );
}
