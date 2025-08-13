import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getInterviews } from "@/actions/interview";
import AIInterviewList from "./_components/AI_Interview_list";

const Page = async () => {
  const interviews = await getInterviews();
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
      <AIInterviewList interviews={interviews} />
    </div>
  );
};

export default Page;
