"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const fetchUser = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setLoading(false);
        setUser(user);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const router = useRouter();
  async function logout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setLoading(false);
      router.push("/");
    }
    setLoading(false);
  }
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-slate-200 rounded-lg w-[98%] mx-auto my-2 shadow-md"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p
            className="font-bold text-inherit hover:cursor-pointer"
            onClick={() => router.replace("/home")}
          >
            HOME
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem> */}
        {/* <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem> */}
        {/* <NavbarItem>
        <Link color="foreground" href="/clinics">
            Clinics
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          color="secondary"
          variant="ghost"
          onClick={() => router.push("/profile")}
        >
          {loading ? <Spinner /> : "Profile"}
        </Button>
        <Button color="danger" variant="ghost" onClick={logout}>
          {loading ? <Spinner /> : "Logout"}
        </Button>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="secondary"
              className="w-full"
              href={item.toLowerCase()}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
