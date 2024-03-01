import { supabase } from "./supabase";
import { Loader } from "@googlemaps/js-api-loader";

export const applyForJob = async (
  jobId: number,
  emailId: string
): Promise<string> => {
  let applicants: any[] = [];
  let newApplicants: any[] = [];
  try {
    const { data, error }: any = await supabase
      .from("jobs")
      .select("applicants")
      .eq("id", jobId);
    applicants = await data[0].applicants;

    if (applicants) {
      const hasIt = await applicants.includes(emailId);
      if (hasIt) {
        newApplicants = [...applicants];
        return "already";
      } else {
        newApplicants = [...applicants, emailId];
      }
    } else {
      newApplicants = [emailId];
    }

    const { data: newApplis, error: err } = await supabase
      .from("jobs")
      .update({ applicants: newApplicants })
      .eq("id", jobId)
      .select();

    if (data) {
      console.log(data);
      return "applied";
    }
  } catch (err) {
    console.log(err);
    return "failed";
  }
  return "called";
};

export const getLatLngObj = async (params: string) => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    version: "weekly",
  });
  const { Geocoder }: any = await loader.importLibrary("geocoding");
  const geoCoder = new Geocoder();
  const { results } = await geoCoder.geocode({ address: params });
  const obj = {
    lat : await results[0]?.geometry.location.lat(),
    lng : await results[0]?.geometry.location.lng(),
  };

  return obj;
};

export const isResumePresent = async (params: string) => {
  const { data } = await supabase.storage
    .from("resumes")
    .createSignedUrl(`${params.split("@")[0]}`, 60);

  if(data){
    return true
  } else {
    return false
  }
};
