import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter()

  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit hover:cursor-pointer" onClick={() => router.replace('/')}>KSDC</p>
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
        <NavbarItem className="">
          <Link href="/auth/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/auth/sign-up" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
