"use client";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/components/NavBar";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthBar from "@/components/AuthBar";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ToastContext from "@/lib/toastContext";
import Toast, { ToastMessage } from "@/components/Toast";
import { supabase } from "@/lib/supabase";

export default function RootLayout({
  children
}:any) {
  const currentPath = usePathname();

  const toast = async (params: ToastMessage) => {
    await setToastMessage(params.message);
    await setToastType(params.type);
    await console.log(params);
    await setIsVisible(true);
  };

  const router = useRouter();
  async function fetchUser() {
    const { data, error } = await supabase.auth.getUser();
    if (data.user) {
      console.log("User Status : ", data)
      router.push("/home");
    }
  }

  useEffect(() => {
    fetchUser()
  },[])

  const [isVisible, setIsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<string>("");

  useEffect(() => {
    // Set a timer for 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <html lang="en">
      <body className="">
        <NextUIProvider>
          <ToastContext.Provider value={{ toast }}>
            <div className="bg-slate-300 min-h-screen mt-[-8px] py-2">
              {currentPath == "/" ||
              currentPath == "/auth/sign-up" ||
              currentPath == "/about" ||
              currentPath == "/faqs" ||
              currentPath == "/auth/login" ? (
                <NavBar />
              ) : (
                <AuthBar />
              )}
              {isVisible && <Toast type={toastType} message={toastMessage} />}
              {children}
            </div>
          </ToastContext.Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
