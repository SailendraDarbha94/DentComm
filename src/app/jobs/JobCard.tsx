"use client";
import { supabase } from "@/lib/supabase";
import ToastContext from "@/lib/toastContext";
import { applyForJob } from "@/lib/utils";
import {
  Card,
  CardHeader,
  Divider,
  Image,
  CardBody,
  CardFooter,
  Link,
  Chip,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const JobCard = ({ params }: any) => {
  const router = useRouter()
  const {toast} = useContext(ToastContext)
  async function fetchUser() {
    const{data, error} = await supabase.auth.getUser()
    if(data.user){
      return data.user
    } else {
      return null
    }
  }
  // useEffect(() => {

  // }, []);

  const applyFoJo = async () => {
    const user = await fetchUser()
    if(user?.email){
      const res = await applyForJob(params.id, user?.email)
      if(res == 'applied'){
        toast({
          message: 'Job Applied Successfully',
          type: 'success'
        })
      } else if(res == 'failed') {
        toast({
          message: 'An Error Occurred! Please try again later.',
          type: 'error'
        })
      } else if(res == 'already'){
        toast({
          message: 'You have already applied for this Job.',
          type: 'error'
        })
      }
    } else {
      toast({
        message: 'User Not Found',
        type: 'error'
      })
      router.push('/home')
    }
  }

  return params.title ? (
    <Card className="w-[98%] md:w-2/3 lg:w-1/2 mx-auto my-2">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2"
          />
          <path
            fill="none"
            stroke="currentColor"
            d="M15.912 18.088v7.368c0 1.356-1.1 2.456-2.456 2.456h0A2.456 2.456 0 0 1 11 25.456v-.816"
          />
          <rect
            width="4.912"
            height="6.508"
            x="18.299"
            y="21.404"
            fill="none"
            stroke="currentColor"
            rx="2.456"
            ry="2.456"
          />
          <path
            fill="none"
            stroke="currentColor"
            d="M32.806 27.363c.448.377.932.549 2.02.549h.55c.897 0 1.624-.728 1.624-1.627h0c0-.899-.727-1.627-1.624-1.627h-1.102a1.625 1.625 0 0 1-1.623-1.627h0c0-.899.727-1.627 1.623-1.627h.551c1.088 0 1.572.172 2.02.549M25.541 23.86c0-1.357 1.1-2.456 2.456-2.456h0c1.356 0 2.456 1.1 2.456 2.456v1.596c0 1.356-1.1 2.456-2.456 2.456h0a2.456 2.456 0 0 1-2.456-2.456m0 2.456v-9.824"
          />
        </svg>
        <div className="flex flex-col">
          <p className="text-md">{params?.title}</p>
          <p className="text-small text-default-500">Posting At {params?.location}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="p-1 text-lg">{params?.description}</p>
        <div className="flex flex-wrap my-2 justify-between">
          <Chip>Avg. Salary: {params?.salary}</Chip>
          <Chip>Timings: {params?.type}</Chip>
          <Chip>Qualification: {params?.qualification}</Chip>
        </div>
        {params.remarks ? (
          <p className="font-semibold block w-full text-center">
            Additional Remarks : {params.remarks}
          </p>
        ) : null}
      </CardBody>
      <Divider />
      <CardFooter>
        {/* <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link> */}
        <div className="w-full">
          <Button onClick={applyFoJo} variant="flat" color="secondary" className="mx-auto block">
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  ) : null;
};

export default JobCard;
