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

const UserCard = ({
  user,
  deleteUser,
  updateUserRole,
}: {
  user: any;
  deleteUser: any;
  updateUserRole: any;
}) => {
  const router = useRouter();
  return (
    <Card className="w-[98%] md:max-w-[90%] lg:max-w-[80%] mx-auto shadow-md my-2 hover:shadow-xl">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="3em"
          viewBox="0 0 14 14"
        >
          <path
            fill="currentColor"
            d="M6.081 2.411c-1.959-1.135-4.835-.82-5.194 2.45c-.36 3.28 1.486 6.751 2.475 8.08c.225.302.589.447.966.447c.617 0 1.169-.387 1.378-.969l.35-.971a1.003 1.003 0 0 1 1.887 0l.35.971c.21.582.762.969 1.38.969c.376 0 .74-.145.964-.447c.99-1.329 2.837-4.8 2.476-8.08c-.359-3.27-3.235-3.585-5.195-2.45c-.615.357-1.22.357-1.837 0m2.37 1.699a.625.625 0 1 1 .429 1.174c-.715.26-1.32.41-1.934.408c-.618-.001-1.19-.155-1.843-.414a.625.625 0 1 1 .462-1.162c.577.23.985.325 1.384.326c.403.001.85-.094 1.503-.332Z"
          />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="4em"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm3-13.82l-2.59-2.59L21 15l4 4l7-7l-1.41-1.41z"
          />
        </svg>
        <div className="flex flex-col items-start">
          <p className="text-md">{user?.email.split("@")[0]}</p>
          <p className="text-small text-default-500">{user?.email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-center w-full">
          {user?.user_metadata?.user_role
            ? JSON.stringify(user?.user_metadata)
            : "No User Role Found For This User"}
        </p>
        <p className="w-full my-2">
          User Id : <Chip>{user?.id}</Chip>
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row">
            <Button
              className="block min-w-40 mx-auto my-2"
              color="warning"
              variant="flat"
              onClick={() => updateUserRole(user?.id, "ADMIN")}
            >
              Update Role to Admin
            </Button>
            <Button
              className="block mx-auto min-w-40 my-2"
              color="warning"
              variant="flat"
              onClick={() => updateUserRole(user?.id, "CLINIC")}
            >
              Update Role to Clinic
            </Button>
          </div>
          <Button
            className="block mx-auto min-w-40 mt-4"
            color="danger"
            variant="flat"
            onClick={() => deleteUser(user?.id)}
          >
            Delete User
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
