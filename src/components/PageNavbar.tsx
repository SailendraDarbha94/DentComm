"use client"
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function PageNavbar() {
  const path = usePathname()
  const router = useRouter();
  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold font-nunito text-inherit hover:cursor-pointer flex items-center justify-center" onClick={() => router.replace('/')}>
            <img src="/toothwalkbgr.png" alt="tooth" className="h-8 w-8" />
            KSDC
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/about" className="font-semibold underline">
            More About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/faqs">
            FAQs
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        {/* <NavbarItem className="">
          <Link href="/auth/login">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          <Button as={Link} color="secondary" href="/auth/home" variant="ghost" className="font-nunito">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
