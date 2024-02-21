"use client";
import JobsList from "@/components/JobsList";
import PostJob from "@/components/PostJob";
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
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import NewJobsList from "../NewJobsList";

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
    if (!error) {
      setLoading(false);
    } else {
      //TODO: toast functionality to alert user that clinic could not be deleted
      router.push("/clinics");
    }
  }

  async function hideForm() {
    setPost(false);
  }

  return (
    <div className="w-full text-center m-0 p-2">
      {clinic ? (
        <Tabs aria-label="options">
          <Tab key="overview" title="Overview">
            <div>
              <Card
                key={clinic.id}
                className="w-[99%] min-h-96 max-h-fit mx-auto shadow-lg my-1"
              >
                <CardHeader className="flex flex-wrap gap-3">
                  <h1 className="text-2xl text-center w-full font-bold">
                    {clinic.name}
                  </h1>
                </CardHeader>
                <CardBody className="max-h-96">
                  <div className="flex flex-wrap w-full justify-around">
                    <div className="text-md m-1 bg-gray-300 rounded-2xl px-2 py-1 text-wrap text-default-500">
                      Address : {clinic.address ? clinic.address : "N/A"}
                    </div>
                    <div className="text-md m-1 bg-gray-300 rounded-2xl px-2 py-1 text-wrap text-default-500">
                      Registration Number :{" "}
                      {clinic.registration_number
                        ? clinic.registration_number
                        : "N/A"}
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
                      Description :{" "}
                      {clinic.description ? clinic.description : "N/A"}
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
            </div>
          </Tab>
          <Tab key="job" title="Post a Job">
            <PostJob
              clinicId={clinicId}
              address={clinic?.address}
              hider={hideForm}
            />
          </Tab>
          <Tab key="jobs" title="View Jobs">
            Posted Jobs
            <NewJobsList clinicId={clinicId} />
          </Tab>
        </Tabs>
      ) : (
        <div>
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default Page;
