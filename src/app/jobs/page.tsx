"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/lib/supabase";
import React, { useContext, useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Divider, Input, Spacer, Spinner } from "@nextui-org/react";
import ToastContext from "@/lib/toastContext";
import { isResumePresent } from "@/lib/utils";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const { toast } = useContext(ToastContext);
  const searchRef = React.useRef<HTMLInputElement>(null);

  async function fetchJobsList() {
    setLoading(true);
    try {
      const { data: jobs, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active");
      if (jobs) {
        setJobs(jobs);
        setLoading(false);
        toast({
          message: "Jobs List Fetched",
          type: "success",
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast({
        message: "Error occured! Please try again later",
        type: "error",
      });
    }
  }

  async function filterJobsList(params: any) {
    setLoading(true);
    console.log("params", params);
    try {
      const { data } = await supabase.from("clinics").select("id, coordinates");
      if (data) {
        const clinicsWithinRadius = await data.map((clinic: any) => {
          const isWithinBounds =
            clinic.coordinates.lat >= params.south &&
            clinic.coordinates.lat <= params.north &&
            clinic.coordinates.lng >= params.west &&
            clinic.coordinates.lng <= params.east;

          if (isWithinBounds) {
            return clinic.id;
          } else {
            return undefined;
          }
          //return console.log("for this clinic id", clinic.id, "whether it is in bounds", );
        });

        const filteredClinics = await clinicsWithinRadius.filter(
          (number) => number !== undefined
        );
        console.log("filtered clinics", filteredClinics);
        const { data: filteredJobs } = await supabase
          .from("jobs")
          .select("*")
          .in("posted_by", filteredClinics);
        //console.log(filteredJobs)
        if (filteredJobs) {
          setJobs(filteredJobs);
        } else {
          toast({
            message: "Error occured! Please try again later",
            type: "error",
          });
        }
        setLoading(false);
      }
    } catch (err) {
      toast({
        message: "Error occured! Please try again later",
        type: "error",
      });
      console.error(err);
      setLoading(false);
    }
  }

  const initMap = async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    const { Place, Autocomplete } = (await loader.importLibrary(
      "places"
    )) as google.maps.PlacesLibrary;

    const autoComplete = new google.maps.places.Autocomplete(
      searchRef.current as HTMLInputElement,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      }
    );
    autoComplete.addListener("place_changed", async function () {
      const place = await autoComplete.getPlace();
      console.log("Selected place:", place); // Log the selected place
      if (place.geometry && place.geometry.location) {
        const latitude = await place.geometry.location.lat();
        const longitude = await place.geometry.location.lng();

        // Create a circle with a 3 km radius around the selected place
        const circle = new google.maps.Circle({
          center: { lat: latitude, lng: longitude },
          radius: 1000, // in meters
        });

        // Get the bounds of the circle
        const bounds = await circle.getBounds();
        //console.log("Bounds:", bounds?.toJSON()); // Log the bounds of the circle
        const radius = await bounds?.toJSON();
        filterJobsList(radius);
        // Perform further actions if needed
      } else {
        console.error("Invalid place geometry or location information");
      }
    });
  };

  useEffect(() => {
    const reese = async () => {
      const res = await isResumePresent("darbhasailu@gmail.com")
      console.log("res",res);
    };
    reese()
    initMap();
    fetchJobsList();
  }, []);

  return (
    <div className="min-h-screen p-2 md:p-10">
      {/* <h1 className="w-full text-center text-2xl font-bold">
        Find Your Next Career Opportunity
      </h1> */}
      <Input
        //isRequired
        ref={searchRef}
        type="text"
        label="Search By Area"
        placeholder=""
        //onChange={(e) => console.log(e.target.value)}
        defaultValue=""
        className="w-10/12 md:w-8/12 mx-auto"
      />
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
