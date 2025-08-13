import Agent from "@/components/Agent";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <Link href="/interview">
        <Button variant="link" className="gap-2 pl-0">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>
      <h3 className="text-5xl font-bold mb-4 mt-4 max-w-xl">
        Interview Generation with AI Agent
      </h3>
      <div>
        <Agent
          userName={user.firstName + " " + user.lastName}
          userId={user.id}
          userImg={user.imageUrl}
          type="generate"
        />
      </div>
    </div>
  );
};

export default page;
