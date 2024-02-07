"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
  Button,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
const ClinicCard = ({ params }: any) => {
    const router = useRouter()
  return (
    <Card className="w-[98%] md:max-w-[80%] lg:max-w-[60%] mx-auto my-2">
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
          height="3em"
          viewBox="0 0 14 14"
        >
          <path
            fill="currentColor"
            d="M6.081 2.411c-1.959-1.135-4.835-.82-5.194 2.45c-.36 3.28 1.486 6.751 2.475 8.08c.225.302.589.447.966.447c.617 0 1.169-.387 1.378-.969l.35-.971a1.003 1.003 0 0 1 1.887 0l.35.971c.21.582.762.969 1.38.969c.376 0 .74-.145.964-.447c.99-1.329 2.837-4.8 2.476-8.08c-.359-3.27-3.235-3.585-5.195-2.45c-.615.357-1.22.357-1.837 0m2.37 1.699a.625.625 0 1 1 .429 1.174c-.715.26-1.32.41-1.934.408c-.618-.001-1.19-.155-1.843-.414a.625.625 0 1 1 .462-1.162c.577.23.985.325 1.384.326c.403.001.85-.094 1.503-.332Z"
          />
        </svg>
        <div className="flex flex-col">
          <p className="text-md">{params?.name}</p>
          <p className="text-small text-default-500">
            {params?.registration_number}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          {params.description
            ? params.description
            : "No description provided for this clinic"}
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full">
          <Chip>{params?.address}</Chip>
          <br />
          <Button className="block mx-auto mt-4" color="secondary" variant="ghost" onClick={() => router.push(`/clinics/${params.id}`)}>
            View Clinic
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClinicCard;
