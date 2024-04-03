import { ABOUT_JOIN_US, ABOUT_MISSION } from "@/constants/texts";
import { Button, Divider, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/constants/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-1">
      <div className="block md:hidden max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          One-Stop Solution <br /> For Dentists & Clinics Alike
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
          Whether you&apos;re a Dentist looking for Job Opportunities or a
          Clinic looking for Talented Dentists, we&apos;ve got you covered
        </p>
      </div>
      <div className="hidden md:block">
        <HeroParallax products={products} />
      </div>
      <Spacer y={40} />
      <div className="flex flex-wrap">
        {/* <div className="w-full md:w-1/2">
          <Image
            width={600}
            height={400}
            alt="landing image"
            src={"/toothless.png"}
            className="rounded-xl mx-auto"
          />
        </div> */}
        <p className="newer md:w-2/3 w-10/12 mx-auto text-xl text-center my-4 py-4 rounded-lg px-4 font-semibold">
          We help talented Dentists find their next work opportunity and we
          connect Clinics with the right talent-pool.
        </p>
        <Spacer y={4} />
        <Divider />
        <p className="w-full text-xl p-4">{ABOUT_JOIN_US}</p>
        <Divider />
        <Spacer y={4} />
        <div className="w-full p-4">
          <h1 className="w-full text-center font-bold text-3xl mb-4">
            <span className="inline border-2 border-black p-2 rounded-md">
              Our Mission
            </span>
          </h1>
          <Spacer y={4} />
          <div className="w-full flex flex-wrap items-center justify-between">
            <Image
              width={240}
              height={240}
              alt="landing image"
              src={"/dentist.png"}
              className="rounded-md md:w-1/4 mx-auto"
            />
            <p className="w-full md:w-2/3 text-xl">{ABOUT_MISSION}</p>
          </div>
          <Spacer y={4} />

          <Spacer y={4} />
          {/* <h1 className="w-full text-center font-bold text-3xl underline">
            Join Us
          </h1> */}
        </div>
        <div className="hidden md:block max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
          <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
            One-Stop Solution <br /> For Dentists & Clinics Alike
          </h1>
          <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
            Whether you&apos;re a Dentist looking for Job Opportunities or a
            Clinic looking for Talented Dentists, we&apos;ve got you covered
          </p>
        </div>
      </div>
    </main>
  );
}
