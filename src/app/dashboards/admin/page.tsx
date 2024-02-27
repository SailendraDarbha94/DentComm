"use client";
import Link from "next/link";
import ClinicsList from "@/components/ClinicsList";
import {
  Spinner,
  Image,
  Spacer,
  Button,
  Tabs,
  Tab,
  Divider,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

import UserCard from "@/components/UserCard";
import ToastContext from "@/lib/toastContext";
import AllClinicsList from "@/components/AllClinicsList";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [showAllClinics, setShowAllClinics] = useState<boolean>(false);
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        console.log(data.user);
        setUser(data?.user);
      }
    };
    getUser();
  }, []);

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  const adminAuthClient = adminSupabase.auth.admin;
  const [type, setType] = useState<string>("-");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createUser = async () => {
    setLoading(true)
    try {
      const { data } = await adminAuthClient.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { user_role: type },
      });

      if (data) {
        setLoading(false)
        setEmail("");
        setPassword("");
        setType("")
        console.log(data);
        toast({
          message: "User created successfully",
          type: "success"
        })
      }
    } catch (err) {
      setLoading(false)
      setEmail("");
      setPassword("");
      setType("")
      toast({
        message: "Error occured! Please try again later",
        type: "error"
      })
      console.error(err)
    }
  };

  async function listUsers() {
    setLoading(true);
    const { data, error } = await adminAuthClient.listUsers();
    if (data) {
      setLoading(false);
      setUsers(data.users);
      toast({
        message: "Users List Fetched Successfully",
        type: "success",
      });
    } else {
      toast({
        message: "Error occured! Please try again later",
        type: "error",
      });
      setLoading(false);
    }
  }

  async function deleteUser(params: string) {
    setLoading(true);
    const { error } = await adminAuthClient.deleteUser(params);
    if (error) {
      toast({
        message: "Error deleting user! Please try again later",
        type: "error",
      });
      setLoading(false);
    } else {
      toast({
        message: "User Deleted Successfully",
        type: "success",
      });
      setLoading(false);
    }
  }

  async function updateUserRole(params: string, role: string) {
    setLoading(true);
    const { error } = await adminAuthClient.updateUserById(params, {
      user_metadata: {
        user_role: role,
      },
    });
    if (error) {
      toast({
        message: "error updating user! please try again later",
        type: "error",
      });
      setLoading(false);
    } else {
      toast({
        message: "user role updated successfully",
        type: "success",
      });
      setLoading(false);
    }
  }

  const router = useRouter()
  return (
    <div className="w-full text-center">
      <Tabs aria-label="options">
        <Tab key="users" title="User Operations">
          <div className="w-full p-2">
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <div className="w-full text-center">
                {users ? (
                  <h2 className="font-semibold text-2xl text-center">
                    All Users
                  </h2>
                ) : null}
                <div>
                  <Button
                    color={users ? "secondary" : "primary"}
                    variant={users ? "light" : "flat"}
                    className="my-2"
                    onClick={() => {
                      if (!users) {
                        listUsers();
                      } else {
                        setUsers(null);
                      }
                    }}
                  >
                    {loading ? (
                      <Spinner size="sm" />
                    ) : users ? (
                      "Hide Users List"
                    ) : (
                      "Show Users List"
                    )}
                  </Button>
                  <Spacer y={4} />
                  <Divider />
                  <Spacer y={4} />
                  {!users && (
                    <div className="w-full">
                      <h2 className="font-semibold text-2xl text-center">
                        Create Authenticated User
                      </h2>
                      <div className="flex flex-col items-center">
                        <Input
                          className="w-80 my-2"
                          name="email"
                          value={email}
                          type="email"
                          label="Email"
                          placeholder=""
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          className="w-80 my-2"
                          name="password"
                          value={password}
                          type="password"
                          label="Password"
                          placeholder=""
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Select
                          onChange={(e) => setType(e.target.value)}
                          label="User Role"
                          placeholder="-"
                          className="w-80 my-2"
                        >
                          <SelectItem key={"-"}>-</SelectItem>
                          <SelectItem key={"ADMIN"}>Admin</SelectItem>
                          <SelectItem key={"CLINIC"}>Clinic</SelectItem>
                          <SelectItem key={"DEFAULT"}>Default</SelectItem>
                        </Select>
                        <Button
                          color="primary"
                          onPress={createUser}
                          variant="flat"
                          className="mx-auto my-auto"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                  {users &&
                    users.map((user: any) => {
                      return (
                        <UserCard
                          key={user.id}
                          user={user}
                          deleteUser={deleteUser}
                          updateUserRole={updateUserRole}
                        />
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </Tab>
        <Tab key="clinics" title="Clinic Operations">
          <div className="w-full p-2">
            <h2 className="font-semibold text-2xl text-center">
              Clinics List
              {!showAllClinics ? (
                <p className="text-sm inline-block font-light">
                  (Registered by {user?.email.split("@")[0]})
                </p>
              ) : null}
            </h2>
            <div className="flex justify-around">
              <Button
                color="secondary"
                variant="flat"
                className="my-2"
                onClick={() => {
                  setShowAllClinics(true);
                }}
              >
                Show All Clinics
              </Button>
              <Button
                color="secondary"
                variant="flat"
                className="my-2"
                onClick={() => router.push('/maps')}
              >
                Show Map View
              </Button>
              <Button
                color="secondary"
                variant="flat"
                className="my-2"
                onClick={() => {
                  setShowAllClinics(false);
                }}
              >
                Show My Clinics
              </Button>
            </div>
            {showAllClinics ? <AllClinicsList /> : <ClinicsList props={user} />}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Page;
