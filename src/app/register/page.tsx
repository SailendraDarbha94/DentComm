"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Register from "./Register";

export default function Page() {
  const [user, setUser] = useState<any>()
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <div className="flex justify-center items-center min-h-80">
      {user ? (
        <Register user={user} />
      ):(
        <Spinner size="lg" />
      )}
    </div>
  );
}