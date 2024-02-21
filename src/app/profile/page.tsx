"use client";

import { supabase } from "@/lib/supabase";
import ToastContext from "@/lib/toastContext";
import {
  Card,
  CardBody,
  Image,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
  Spacer,
  Input,
  Button,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

const Page = () => {
  const { toast } = useContext(ToastContext);
  const [file, setFile] = useState<any>(null);
  const [publicUrl, setPublicUrl] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUser(data?.user);
        getResumeUrl(data?.user?.email);
      }
    }
    fetchUser();
  }, []);

  const getResumeUrl = async (params: string) => {
    const { data } = await supabase.storage
      .from("resumes")
      .createSignedUrl(`${params.split("@")[0]}`, 60);

    setPublicUrl(data?.signedUrl);
  };
  function formatDate(timestamp: string | undefined) {
    const date = new Date(timestamp as string);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
  const handleUpload = async () => {
    console.log(file);
    const res = await supabase.storage
      .from("resumes")
      .upload(`${user.email.split("@")[0]}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (res) {
      console.log(res);
      toast({
        message: "File Uploaded Successfully",
        type: "success",
      });
      getResumeUrl(user.email);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      {user ? (
        <p className="text-2xl w-full max-h-fit font-semibold p-4 m-2 text-center">
          Welcome{" "}
          <span className="text-primary-500">{user?.email.split("@")[0]}</span>
        </p>
      ) : (
        <p className="text-2xl w-full max-h-fit font-semibold p-4 m-2">
          User Not Found
        </p>
      )}
      {/* <div className="flex flex-col w-full md:w-[50%] mx-auto p-2 items-center">
        <div className="flex justify-between w-full my-1">
          <Chip>Last Sign In</Chip>
          <Chip>{user?.last_sign_in_at}</Chip>
        </div>
        <div className="flex justify-between w-full my-1">
          <Chip>Status</Chip>
          <Chip>{user?.role}</Chip>
        </div>
        <div className="flex justify-between w-full my-1">
          <Chip>Email</Chip>
          <Chip>{user?.email}</Chip>
        </div>
        <div className="flex justify-between w-full my-1">
          <Chip>Phone Number</Chip>
          <Chip>{user?.phone ? user.phone : "N/A"}</Chip>
        </div>
      </div> */}
      <div className="flex flex-wrap w-full justify-center">
        <Card className="min-w-[400px]">
          <CardHeader className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="4em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 8c0-2.21 1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4m3.14 11.75L8.85 19l.29-.75c.7-1.75 1.94-3.11 3.47-4.03c-.82-.14-1.69-.22-2.61-.22c-4.42 0-8 1.79-8 4v2h7.27c-.04-.09-.09-.17-.13-.25M17 18c-.56 0-1 .44-1 1s.44 1 1 1s1-.44 1-1s-.44-1-1-1m6 1c-.94 2.34-3.27 4-6 4s-5.06-1.66-6-4c.94-2.34 3.27-4 6-4s5.06 1.66 6 4m-3.5 0a2.5 2.5 0 0 0-5 0a2.5 2.5 0 0 0 5 0"
              />
            </svg>
            <div className="flex flex-col">
              <p className="text-md">{user?.email}</p>
              <p className="text-small text-default-500">{user?.role}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col w-full mx-auto p-2 items-center">
              <div className="flex justify-between w-full my-1">
                <Chip>Email</Chip>
                <Chip>{user?.email}</Chip>
              </div>
              <div className="flex justify-between w-full my-1">
                <Chip>Last Sign In</Chip>
                <Chip>
                  {user?.last_sign_in_at
                    ? formatDate(user?.last_sign_in_at)
                    : null}
                </Chip>
              </div>
              {/* <div className="flex justify-between w-full my-1">
                <Chip>Status</Chip>
                <Chip>{user?.role}</Chip>
              </div> */}
              <div className="flex justify-between w-full my-1">
                <Chip>Created At</Chip>
                <Chip>
                  {user?.created_at ? formatDate(user?.created_at) : "N/A"}
                </Chip>
              </div>
              <div className="flex justify-between w-full my-1">
                <Chip>Phone Number</Chip>
                <Chip>{user?.phone ? user.phone : "N/A"}</Chip>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            {publicUrl ? (
              <div className="flex w-full justify-center items-center">
                <Link className="block" isExternal href={publicUrl}>
                  View Resume
                </Link>
              </div>
            ) : (
              <div className="min-h-fit mt-10 w-full">
                <p className="w-full text-center font-serif">
                  {file ? "Resume Selected" : "Upload Resume"}
                </p>
                <Input
                  className="w-80 block my-2 mx-auto"
                  name="resume"
                  type="file"
                  label=""
                  placeholder=""
                  onChange={(e: any) => setFile(e.target.files[0])}
                />
                {/* <Input
                          className="w-80 block my-2 mx-auto"
                          name="name"
                          value={name}
                          type="text"
                          label="File Name"
                          placeholder=""
                          onChange={(e: any) => setName(e.target.value)}
                        /> */}
                <br />
                <Button
                  //disabled={name.length < 3}
                  color={"default"}
                  variant="flat"
                  className="mx-auto block"
                  onPress={handleUpload}
                >
                  Upload
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
