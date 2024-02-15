"use client";
import ClinicCard from "@/components/ClinicCard";
import { supabase } from "@/lib/supabase";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const JobsList = ({ clinicId }: any) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(clinicId);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const id = await clinicId
        if (id) {
          const { data: jobs, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("posted_by", clinicId);
          if (jobs) {
            console.log(jobs);
            setJobs(jobs)
            setLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [clinicId]);
  return (
    <div className="w-full">
      {loading ? (
        <div className="flex w-full justify-center h-80 items-center">
          <Spinner size="lg" />
        </div>
      ) : jobs ? (
        jobs.map((job: any) => {
          return (
            <div key={job.id} className="min-h-20 bg-blue-300 rounded-md my-2 p-4">
                {job?.title ? job?.title : "Job Title Not Found"}
            </div>
          );
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

export default JobsList;
