import Image from "next/image";
import { Inter } from "next/font/google";
import Dashbord from "./dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Dashbord/>
    </>
  );
}
