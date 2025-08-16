import Agent from "@/components/Agent";
import { currentUser } from "@clerk/nextjs/server";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/actions/interview";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const user = await currentUser();
  const interview = await getInterviewById(id);

  if (!interview) {
    redirect("/");
  }

  const feedback = await getFeedbackByInterviewId(interview.id);
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-col gap-2 items-start">
            <h3 className="capitalize font-semibold text-lg">
              {interview.role} Interview
            </h3>
            <div>
              <span className="font-medium">Tech Stack:</span>
              {interview.techStack.map((tech) => tech).join(", ")}
            </div>
          </div>
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize border border-border">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.firstName + " " + user?.lastName}
        userId={user?.id}
        userImg={user?.imageUrl}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackID={feedback?.id}
      />
    </>
  );
};

export default page;
