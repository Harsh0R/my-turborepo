import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/Components/Navbar/Navbar";
import { SwapContext, SwapProvider  } from "@/Context/context";
import { useContext } from "react";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <SwapProvider>
        <Navbar />
      </SwapProvider>
    </main>
  );
}
