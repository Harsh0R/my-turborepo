import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/Components/Navbar/Navbar";
import { SwapContext, SwapProvider  } from "@/Context/context";
import { useContext } from "react";
import HeroComponent from "@/Components/HeroComponent/HeroComponent";
import TokenBalanceComponent from "@/Components/TokenBalanceComponent/TokenBalanceComponent";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <SwapProvider>
        <Navbar />
        <TokenBalanceComponent/>
        <HeroComponent/>
      </SwapProvider>
    </main>
  );
}
