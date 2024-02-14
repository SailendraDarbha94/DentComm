"use client";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/components/NavBar";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthBar from "@/components/AuthBar";
import { usePathname } from "next/navigation";
import React from "react";

export default function RootLayout({
  children,
  props
}: Readonly<{
  children: React.ReactNode,
  props:any
}>) {
  const currentPath = usePathname();

  return (
    <html lang="en">
      <body className="">
        <NextUIProvider>
          {currentPath == "/" ||
          currentPath == "/auth/sign-up" ||
          currentPath == "/about" ||
          currentPath == "/faqs" ||
          currentPath == "/auth/login" ? (
            <NavBar />
          ) : (
            <AuthBar />
          )}
            {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
