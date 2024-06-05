"use client";
import { supabase } from "@/lib/supabase";
import ToastContext from "@/lib/toastContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Page = () => {
  const router = useRouter();

  
  return (
    <main className="min-h-screen w-full pt-20">
      <Card className="w-[90%] mx-auto max-w-md my-4">
        <CardHeader className="text-3xl font-nunito">
          Login as Dentist
        </CardHeader>
        <CardBody>
          <p className="text-lg font-nunito">For searching and applying jobs</p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button variant="ghost" color="primary" className="mb-3" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-[90%] mx-auto max-w-md my-4">
        <CardHeader className="text-3xl font-nunito">
          Login as Clinic Manager
        </CardHeader>
        <CardBody>
          <p className="text-lg font-nunito">
            For registering and managing clinics, managing dentists and posting
            jobs etc.
          </p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button variant="ghost" color="secondary" className="mb-3" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-[90%] mx-auto max-w-md my-4">
        <CardHeader className="text-3xl font-nunito">Login as Admin</CardHeader>
        <CardBody>
          <p className="text-lg font-nunito">For Administrative Purposes</p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button variant="ghost" color="danger" className="mb-3" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Page;
