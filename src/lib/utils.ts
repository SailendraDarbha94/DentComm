import { supabase } from "./supabase";

export const applyForJob = async (jobId: number, emailId: string): Promise<string> => {
  let applicants: any[] = [];
  let newApplicants:any[] = [];
  try {
    const { data, error }: any = await supabase
      .from("jobs")
      .select("applicants")
      .eq("id", jobId);
    applicants = await data[0].applicants;

    if(applicants){
        const hasIt = await applicants.includes(emailId)
        if(hasIt){

            newApplicants = [...applicants]
            return "already"
        } else {
            newApplicants = [...applicants, emailId]
        }
    }else{
        newApplicants = [emailId] 
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
  return "called"
};
