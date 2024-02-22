"use client";
import ClinicCard from "@/components/ClinicCard";
import { supabase } from "@/lib/supabase";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const AllClinicsList = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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
    fetchClinics();
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <div className="flex w-full justify-center h-80 items-center">
          <Spinner size="lg" />
        </div>
      ) : clinics ? (
        clinics.map((clinic: any) => {
          return <ClinicCard params={clinic} key={clinic.id} />;
        })
      ) : (
        <>
          <p>No Clinics Found,</p>
          <br />
          <p> Please Register a Clinic</p>
        </>
      )}
    </div>
  );
};

export default AllClinicsList;
