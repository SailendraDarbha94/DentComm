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
      <section className=" dark:bg-gray-900 bg-slate-50 font-nunito mt-20 rounded-xl">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Platform for Dentists
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              We help dentists in finding great opportunities, and we help clinics in both management and finding the right talent
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Know More
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="/toothwalk.png"
              alt="mockup"
              className="max-w-full max-h-96 mx-auto rounded-xl"
            />
          </div>
        </div>
      </section>
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
        {/* <p className="newer md:w-2/3 w-10/12 border-gray-600 border-2 bg-gray-600 text-white text-clip text mx-auto text-xl text-center my-4 py-4 rounded-lg px-4 font-semibold">
          We help talented Dentists find their next work opportunity and we
          connect Clinics with the right talent-pool.
        </p> */}
        <Spacer y={4} />
        <Divider />
        <p className="w-full text-xl p-4 font-nunito">{ABOUT_JOIN_US}</p>
        <Divider />
        <Spacer y={4} />
        <div className="w-full p-4">
          <h1 className="w-full text-center font-bold lg:text-5xl text-3xl mb-4">
            <span className="inline border-2 border-black p-2 font-nunito rounded-md">
              Our Mission
            </span>
          </h1>
          <Spacer y={4} />
          <div className="w-full flex flex-wrap items-center justify-between">
            <Image
              width={240}
              height={240}
              alt="landing image"
              src={"/dentist.webp"}
              className="rounded-xl md:w-1/4 mx-auto"
            />
            <p className="w-full md:w-2/3 text-xl font-nunito">{ABOUT_MISSION}</p>
          </div>
          <Spacer y={4} />

          <Spacer y={4} />
          {/* <h1 className="w-full text-center font-bold text-3xl underline">
            Join Us
          </h1> */}
        </div>
        <div className="hidden md:block font-nunito max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold dark:text-white">
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
