import { Card, CardFooter, Image, Button, CardHeader } from "@nextui-org/react";
import Link from "next/link";

export default function LandingCard({ params }: any) {
  console.log(params);
  return (
    <Card isFooterBlurred radius="lg" className="">
      <div className="flex justify-center w-full">
        <Image
          alt={params?.alt}
          className="mx-auto"
          height={200}
          src={params?.img}
          width={200}
        />
      </div>

      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-black">{params?.txt}</p>
        <Button
          as={Link}
          className="text-tiny text-black bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          href={params?.link}
        >
          {params?.btn}
        </Button>
      </CardFooter>
    </Card>
  );
}
