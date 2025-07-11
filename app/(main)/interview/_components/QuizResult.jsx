import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideNewStart = false, onStartNew }) => {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <h1 className="flex items-center gap-2 gradient-title text-3xl">
        <Trophy className="h-6 w-6" />
        Quiz Result
      </h1>

      <CardContent>
        {/* score overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full" />
        </div>

        {/* improvement tip */}
        {result.improvementTip && (
          <div className="bg-muted p-4 mt-4 rounded-lg">
            <p className="font-medium">Improvement Tip</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        <div className="space-y-4 mt-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div className="border rounded-lg p-4 space-y-2" key={index}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Your Answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct Answer: {q.answer}</p>}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideNewStart && (
        <CardFooter>
          <Button onClick={onStartNew}>Start New Quiz</Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
