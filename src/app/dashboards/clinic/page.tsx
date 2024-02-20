"use client";
import Link from "next/link";
import ClinicsList from "@/components/ClinicsList";
import { supabase } from "@/lib/supabase";
import { Spinner, Image, Spacer, Button } from "@nextui-org/react";
import React,{ useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      if (data) {
        console.log(data?.user);
        setUser(data?.user);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full p-2 md:w-1/2">
          {loading ? (
            <Spinner size="lg" />
          ) : user ? (
            <div className="flex flex-col items-center justify-around rounded-lg p-2">
              <Image
                alt="dentist"
                className="mx-auto"
                height={200}
                src="/dentist.png"
                width={200}
              />
              <Spacer y={4} />
              <p className="font-semibold">{user.email}</p>
              <Spacer y={4} />
              <Button 
                as={Link}
                href="/register"
                variant="ghost"
                color="secondary"
              >
                Register New Clinic
              </Button>
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
            <ClinicsList props={user} />
        </div>
      </div>
    </div>
  );
};

export default Page;
