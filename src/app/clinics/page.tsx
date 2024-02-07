"use client"
import ClinicCard from "@/components/ClinicCard";
import { supabase } from "@/lib/supabase";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Page = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const { data: clinics, error } = await supabase
        .from("clinics")
        .select("*");
      if (clinics) {
        console.log(clinics);
        setClinics(clinics);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics()
  },[])
  return (
    <div className="w-full">
      {loading ? (
        <div className="flex w-full justify-center h-80 items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        clinics &&
        clinics.map((clinic:any) => {
          return <ClinicCard params={clinic} key={clinic.id} />
        })
      )}
    </div>
  );
};

export default Page;
