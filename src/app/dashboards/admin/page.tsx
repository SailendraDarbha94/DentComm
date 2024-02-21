"use client";
import Link from "next/link";
import ClinicsList from "@/components/ClinicsList";
import { Spinner, Image, Spacer, Button } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/lib/utils";
import UserCard from "@/components/UserCard";
import ToastContext from "@/lib/toastContext";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>(null);

  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        console.log(data.user);
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

  async function updateUserRole(params: string, role:string) {
    setLoading(true);
    const { error } = await adminAuthClient.updateUserById(params, {
        user_metadata: {
            "user_role" : role
        }
    })
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


  return (
    <div>
      <div className="flex w-full flex-wrap">
        <div className="w-full p-2 md:w-1/2">
          {loading ? (
            <Spinner size="lg" />
          ) : (
            <div className="w-full text-center">
              <h2 className="font-semibold text-2xl text-center">Admin User</h2>
              <div>
                <Button
                  color="secondary"
                  variant="flat"
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

                {users &&
                  users.map((user: any) => {
                      return <UserCard key={user.id} user={user} deleteUser={deleteUser} updateUserRole={updateUserRole} />
                  })}
              </div>
            </div>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
          <ClinicsList />
        </div>
      </div>
    </div>
  );
};

export default Page;
