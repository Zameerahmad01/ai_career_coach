import { getAssessments } from "@/actions/interview";
import StatsCard from "./_components/StatsCard";
import PerformanceCard from "./_components/Performance-card";
import QuizList from "./_components/Quiz-list";
import { Button } from "@/components/ui/button";
import { StarsIcon } from "lucide-react";
import Link from "next/link";

const InterviewPage = async () => {
  // Fetch assessments data from the server
  const assessments = await getAssessments();

  return (
    <div className="space-y-6">
      <h1 className="gradient-title text-5xl font-bold mb-4">
        Interview Preparation
      </h1>
      <div className="flex flex-col md:flex-row items-start gap-4">
        <Link href="/interview/quiz">
          <Button>New Quiz</Button>
        </Link>
        <Link href="/interview/mock">
          <Button className="bg-white hover:bg-gray-300 text-black">
            <StarsIcon className="w-4 h-4 mr-2" />
            Interview with AI Agent
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <StatsCard assessments={assessments} />
        <PerformanceCard assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
