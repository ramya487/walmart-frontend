import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SearchSpace from "@/components/SearchSpace";
import Section1 from "@/components/Section1";
import { Playfair_Display } from "next/font/google";
const pt = Playfair_Display({ weight:'700', subsets: ['latin'] });



export default function Home() {
  return (
    <main>
    <Navbar />
    <Section1 />
    <Hero />
    <div className="w-full font-extrabold tracking-wide p-6 flex justify-center items-center text-xl dec"><span className={pt.className}>WELCOME TO MULTI-LINGUAL CONVERSATIONAL ASSISTANT</span></div>
    <SearchSpace />
    </main>
  );
}
