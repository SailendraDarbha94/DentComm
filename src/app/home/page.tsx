"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Spacer,
  Divider,
} from "@nextui-org/react";
import LandingCard from "./LandingCard";
import { INTRO_TEXT } from "@/constants/texts";
import { supabase } from "@/lib/supabase";

let params = {
  first: {
    alt: "dentist",
    img: "/dentist.png",
    txt: "For Dentists",
    btn: "Jobs",
    link: "/jobs",
  },
  second: {
    alt: "clinic",
    img: "/clinic.png",
    txt: "For Clinics",
    btn: "Dashboard",
    link: "/dashboards/clinic",
  },
  third: {
    alt: "admin",
    img: "/admin.png",
    txt: "For Admins",
    btn: "Dashboard",
    link: "/dashboards/admin",
  },
};

const Page = () => {
  const [userRole, setUserRole] = useState<any>();
  const [user,setUser] = useState<any>()

  useEffect(() => {
    const getUser = async () => {
      const {data} = await supabase.auth.getUser();
      if(data){
        setUser(data.user)
        console.log(data.user)
      }
    };
    getUser()
  }, []);

  return (
    <div className="m-2 min-h-screen p-10 rounded-lg shadow-xl">
      <div className="flex flex-wrap w-full">
        <h1 className="w-full text-center text-4xl font-bold">
          Welcome to KSDC communities
        </h1>
        <Spacer y={2} />
        <Divider />
        <Spacer y={4} />
        <div className="flex flex-col sm:flex-row flex-wrap justify-around w-full">
          <LandingCard params={params.first} />
          {user && user.user_metadata?.user_role === "ADMIN" ? <LandingCard params={params.third} /> : null}
          <LandingCard params={params.second} />
        </div>
        <Spacer y={4} />
        <Divider />
        <Spacer y={4} />
        <p className="font-light p-4 text-xl leading-relaxed">{INTRO_TEXT}</p>
      </div>
    </div>
  );
};

export default Page;
