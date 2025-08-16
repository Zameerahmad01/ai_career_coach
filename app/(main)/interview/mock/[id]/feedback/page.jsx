import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getInterviewById,
  getFeedbackByInterviewId,
} from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Star } from "lucide-react";

const Feedback = async ({ params }) => {
  const { id } = await params;

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId(interview.id);

  return (
    <section className="section-feedback container mx-auto ">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold max-w-[600px] text-center">
          Feedback on the Interview -{" "}
          <span className="capitalize ">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5 mt-5 mb-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Star className="w-6 h-6 text-primary-200" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback?.score}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <CalendarIcon className="w-6 h-6 text-primary-200" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-2  mt-5 mb-5 max-w-[900px] mx-auto bg-card p-5 rounded-lg">
        <h2 className="text-2xl font-semibold">Interview Breakdown</h2>
        {feedback?.feedback?.finalAssessment.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-5 mb-5 max-w-[900px] mx-auto bg-card p-5 rounded-lg">
        <h2 className="text-2xl font-semibold">Strengths</h2>
        <ul>
          {feedback?.feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 mt-5 mb-5 max-w-[900px] mx-auto bg-card p-5 rounded-lg">
        <h2 className="text-2xl font-semibold">Areas for Improvement</h2>
        <ul>
          {feedback?.feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons flex flex-col md:flex-row gap-5 items-center justify-center">
        <Button className="btn-secondary px-8">
          <Link href="/interview/mock" className="flex justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary bg-white hover:bg-white/80 px-8">
          <Link href={`/interview/mock/${id}`} className="flex justify-center">
            <p className="text-sm font-semibold text-black text-center ">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
