"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AIInterviewList({ interviews }) {
  const router = useRouter();
  console.log(interviews);
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Interviews
              </CardTitle>
              <CardDescription>
                Review your past interview performance
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/interview/mock/generate")}>
              Start New Interview
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews?.map((interview) => (
              <Card
                key={interview.id}
                className=" hover:bg-muted/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="gradient-title text-2xl flex items-center justify-between gap-2">
                    {interview.role}
                    <span className="text-muted-foreground text-sm capitalize">
                      {interview.type}
                    </span>
                  </CardTitle>
                  <CardDescription className="flex justify-between w-full">
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Tech Stack:</span>
                      {interview.techStack.map((tech) => tech).join(", ")}
                    </div>
                    <div>
                      {format(
                        new Date(interview.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p>
                        Score :{" "}
                        {interview.feedback?.score
                          ? `${interview.feedback.score}/100`
                          : "--/100"}
                      </p>
                      <p>Questions : {interview.questions.length}</p>
                    </div>
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        interview.feedback
                          ? router.push(
                              `/interview/mock/${interview.id}/feedback`
                            )
                          : router.push(`/interview/mock/${interview.id}`)
                      }
                    >
                      {interview.feedback ? "View Feedback" : "Start Interview"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
