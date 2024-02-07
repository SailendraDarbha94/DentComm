import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-red-100 p-4">
      Hello World
      <Button color="secondary" variant="faded">Button</Button>
    </main>
  );
}
