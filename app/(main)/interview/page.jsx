import { getAssessments } from "@/actions/interview";
import StatsCard from "./_components/StatsCard";
import PerformanceCard from "./_components/Performance-card";
import QuizList from "./_components/Quiz-list";

const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div className="space-y-6">
      <h1 className="gradient-title text-5xl font-bold mb-4">
        Interview Preparation
      </h1>
      <div className="flex flex-col gap-4">
        <StatsCard assessments={assessments} />
        <PerformanceCard assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
