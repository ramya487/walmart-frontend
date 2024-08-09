import Hero from "@/components/Hero";
import SearchSpace from "@/components/SearchSpace";
import { Playfair_Display } from "next/font/google";
const pt = Playfair_Display({ weight:'700', subsets: ['latin'] });



export default function Home() {
  return (
    <main>
    <Hero />
    <div className="w-full font-extrabold tracking-wide p-6 flex justify-center items-center text-xl dec"><span className={pt.className}>WELCOME TO MULTI-LINGUAL CONVERSATIONAL ASSISTANT</span></div>
    <SearchSpace />
    </main>
  );
}
