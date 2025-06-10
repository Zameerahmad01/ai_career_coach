"use client";

import { generateCoverLetter } from "@/actions/cover-letter";
import { coverLetterSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CoverLetterGenerator = () => {
  const router = useRouter();
  // Initialize the form with react-hook-form
  // and set up validation with zod
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      description: "",
    },
  });

  // Mutation for generating the cover letter
  // using react-query for better state management
  const generateCoverMutation = useMutation({
    mutationFn: ({ data }) => generateCoverLetter(data),
    onSuccess: (data) => {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${data.id}`); // Redirect to the generated cover letter
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Function to handle form submission
  const onSubmit = (data) => {
    generateCoverMutation.mutate({
      data,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4 p-6 bg-muted/50 border rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  htmlFor="jobTitle"
                >
                  Job Title
                </Label>
                <Input
                  type="text"
                  id="jobTitle"
                  {...register("jobTitle")}
                  error={errors.jobTitle}
                  placeholder="Enter the job title"
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  htmlFor="companyName"
                >
                  Company Name
                </Label>
                <Input
                  type="text"
                  id="companyName"
                  {...register("companyName")}
                  error={errors.companyName}
                  placeholder="Enter the company name"
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Cover Letter description
              </Label>
              <Textarea
                id="description"
                {...register("jobDescription")}
                error={errors.jobDescription}
                className="w-full p-2 border rounded h-32"
                placeholder="Write your cover letter here..."
              ></Textarea>
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <Button type="submit">
              {generateCoverMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                "Generate Cover Letter"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetterGenerator;
