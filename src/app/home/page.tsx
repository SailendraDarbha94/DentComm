import React from "react";
import { Card, CardFooter, Image, Button, Spacer, Divider } from "@nextui-org/react";
import LandingCard from "./LandingCard";
import { INTRO_TEXT } from "@/constants/texts";

let params = {
  first: {
    alt: "dentist",
    img: "/dentist.png",
    txt: "For Dentists",
    btn: "Jobs",
    link: "/jobs"
  },
  second: {
    alt: "clinic",
    img: "/clinic.png",
    txt: "For Clinics",
    btn: "Dashboard",
    link: "/dashboards/clinic"
  },
};

const Page = () => {
  return (
    <div className="m-2 min-h-screen p-10 rounded-lg shadow-xl">
      <div className="flex flex-wrap w-full">
        <h1 className="w-full text-center text-4xl font-bold">Welcome to KSDC communities</h1>
        <Spacer y={2} />
        <Divider />
        <Spacer y={4} />
        <div className="flex flex-col sm:flex-row flex-wrap justify-around w-full">
          <LandingCard params={params.first} />
          <LandingCard params={params.second} />
        </div>
        <Spacer y={4} />
        <Divider />
        <Spacer y={4} />
        <p>{INTRO_TEXT}</p>
      </div>
    </div>
  );
};

export default Page;
