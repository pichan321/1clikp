import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-6"><Image src={require("@/images/icon.png")} width={100} alt=""/></div>
        <div className="col-span-6">
          <div className="flex gap-x-5 justify-end p-10">
            <h2 className="cursor-pointer ">Documentation</h2>
            <h2 className="cursor-pointer ">Pricing</h2>
            <h2 className="cursor-pointer">About</h2>
            <h2 className="cursor-pointer">Sign Up</h2>
          </div>
        </div>
      </div>

  
 
    </div>
  );
}
