import { ABOUT_JOIN_US, ABOUT_MISSION } from "@/constants/texts";
import { Button, Divider, Spacer } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <Image
            width={600}
            height={400}
            alt="landing image"
            src={"/toothless.png"}
            className="rounded-xl mx-auto"
          />
        </div>
        <div className="w-full p-4 md:w-1/2">
          <h1 className="w-full text-center font-bold text-3xl underline">
            Our Mission
          </h1>
          <Spacer y={2} />
          <p className="w-full">{ABOUT_MISSION}</p>
          <Spacer y={4} />
          <Divider />
          <Spacer y={4} />
          <h1 className="w-full text-center font-bold text-3xl underline">
            Join Us
          </h1>
          <Spacer y={2} />
          <p className="w-full">{ABOUT_JOIN_US}</p>
        </div>
      </div>
    </main>
  );
}
