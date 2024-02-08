"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Divider, Spacer, Spinner } from "@nextui-org/react";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<any[]>([]);

  async function fetchJobsList() {
    setLoading(true);
    try {
      const { data: jobs, error } = await supabase.from("jobs").select("*");
      if (jobs) {
        setJobs(jobs);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobsList();
  }, []);

  return (
    <div className="min-h-screen p-2 md:p-10">
      <h1 className="w-full text-center text-2xl font-bold">
        Find Your Next Career Opportunity
      </h1>
      <Spacer y={3} />
      <Divider />
      <Spacer y={4} />
      {loading ? (
        <div className="flex w-full min-h-80 justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        jobs &&
        jobs.map((job: any) => {
          return <JobCard key={job.id} params={job} />;
        })
      )}
    </div>
  );
};

export default Page;
