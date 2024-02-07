"use client";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Chip,
  CardFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Page = ({ params }: { params: { clinicId: string } }) => {

  const router = useRouter();
  const { clinicId }: { clinicId: string } = params;

  const [clinic, setClinic] = useState<any>(null);
  const [post, setPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchClinicDetails() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", clinicId);
      if (data) {
        console.log(data);
        setClinic(data[0]);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClinicDetails();
  }, []);

  async function deleteClinic() {
    setLoading(true);
      const { error } = await supabase
        .from("clinics")
        .delete()
        .eq("id", clinicId);
      if(!error){
        setLoading(false)
      } else {
        //TODO: toast functionality to alert user that clinic could not be deleted
        router.push('/clinics')
      }
  }

  return (
    <div className="flex w-full min-h-screen justify-center">
      {clinic ? (
        <Card
          key={clinic.id}
          className="w-[99%] min-h-96 max-h-fit shadow-lg my-1"
        >
          <CardHeader className="flex flex-wrap gap-3">
            <h1 className="text-2xl text-center w-full font-bold">
              {clinic.name}
            </h1>
          </CardHeader>

          <Divider />
          <Button
            color="secondary"
            onPress={() => setPost(!post)}
            variant="flat"
            className="mx-auto my-2 text-center"
          >
            Post a Job
          </Button>
          {post ? (
            <div>create a post job component</div>
          ) : // <PostJob clinicId={clinicId} address={clinic.address}   />
          null}
          <Divider />
          <CardBody>
            <div className="flex flex-wrap w-full justify-around">
              <div className="text-md m-1 bg-gray-300 rounded-2xl px-2 py-1 text-wrap text-default-500">
                Address : {clinic.address ? clinic.address : "N/A"}
              </div>
              <div className="text-md m-1 bg-gray-300 rounded-2xl px-2 py-1 text-wrap text-default-500">
                Registration Number : {clinic.registration_number ? clinic.registration_number : "N/A"}
              </div>
              {/* <div className="text-md m-1 bg-gray-300 rounded-2xl px-2 py-1 text-wrap text-default-500">
                Timings : {clinic.timings ? clinic.timings : "N/A"}
              </div>
              <div className="text-md m-1 bg-gray-300 rounded-2xl px-2 py-1 text-wrap text-default-500">
                Specialties : {clinic.specialties ? clinic.specialties : "N/A"}
              </div> */}
            </div>
            <div className="w-full text-lg text-center">
              <p>
                Description : {clinic.description ? clinic.description : "N/A"}
              </p>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              color="danger"
              onPress={deleteClinic}
              variant="flat"
              className="mx-auto text-center"
            >
              Delete Clinic
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div>
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default Page;
