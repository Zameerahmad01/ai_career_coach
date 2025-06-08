import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BriefcaseIcon, TrendingUp, TrophyIcon } from "lucide-react";
import React from "react";

const StatsCard = ({ assessments }) => {
  const averageScore = () => {
    if (!assessments || assessments.length === 0) return 0;
    const totalScore = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (totalScore / assessments.length).toFixed(2);
  };

  const latestQuizScore = () => {
    if (!assessments || assessments.length === 0) return 0;
    const latestAssessment = assessments[0];
    return latestAssessment.quizScore || 0;
  };

  const totalQuestions = () => {
    if (!assessments || assessments.length === 0) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
    return total;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* average score */}
      <Card className="gap-2">
        <CardHeader className="flex items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrophyIcon className={`w-4 h-4 `} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore()}%</div>
          <p className="text-muted-foreground text-xs">
            Across all Assessments
          </p>
        </CardContent>
      </Card>

      {/* questions practiced */}
      <Card className="gap-2">
        <CardHeader className="flex items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuestions()}</div>
          <p className="text-muted-foreground text-xs">
            Total Questions Attempted
          </p>
        </CardContent>
      </Card>

      {/* last quiz score */}
      <Card className="gap-2">
        <CardHeader className="flex items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <TrophyIcon className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latestQuizScore()}</div>
          <p className="text-muted-foreground text-xs">
            Latest Assessment Score
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
