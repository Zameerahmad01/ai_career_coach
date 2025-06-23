import Link from "next/link";
import AgentQuizStarter from "./AgentQuizStarter";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Page = async () => {
  const user = await currentUser();

  return (
    <div>
      <Link href="/interview">
        <Button variant="link" className="gap-2 pl-0">
          <ArrowLeft className="w-4 h-4" />
          Back to Interview Preparation
        </Button>
      </Link>
      <h3 className="text-5xl font-bold mb-4 mt-4 max-w-xl">
        Interview Generation with AI Agent
      </h3>
      <AgentQuizStarter
        userName={user?.firstName + " " + user?.lastName || "User"}
        userId={user?.id}
        userImg={user.image_url}
      />
    </div>
  );
};

export default Page;
