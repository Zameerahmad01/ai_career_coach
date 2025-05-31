import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
