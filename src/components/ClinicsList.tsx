"use client";
import ClinicCard from "@/components/ClinicCard";
import { supabase } from "@/lib/supabase";
import { Spacer, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const ClinicsList = ({ props }: any) => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(props?.id);

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      try {
        const id = await props?.id;
        if (id) {
          const { data: clinics, error } = await supabase
            .from("clinics")
            .select("*")
            .eq("creator", id);
          if (clinics) {
            console.log(clinics);
            setClinics(clinics);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchClinics();
  }, [props]);
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
        <div className="w-full">
          <p className="text-lg text-center font-serif">No Clinics Found,</p>
          <Spacer y={4} />
          <p className="text-lg text-center font-serif">Please Register your Clinics to utilise our services</p>
        </div>
      )}
    </div>
  );
};

export default ClinicsList;
