"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "../../../lib/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  // const {
  //   loading: updateLoading,
  //   data: updateResult,
  //   error: updateError,
  //   fetchData: updateUserData,
  // } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success("Profile Completed Successfully");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // To execute the mutation:
  const onSubmit = async (data) => {
    const formattedIndustry = `${data.industry}-${data.subIndustry
      .toLowerCase()
      .replace(/ /g, "-")}`;
    mutation.mutate({
      ...data,
      industry: formattedIndustry,
    });
  };

  // const onSubmit = async (data) => {
  //   const formattedIndustry = `${data.industry}-${data.subIndustry
  //     .toLowerCase()
  //     .replace(/ /g, "-")}`;
  //   await updateUserData({
  //     ...data,
  //     industry: formattedIndustry,
  //   });
  // };

  // useEffect(() => {
  //   if (updateResult?.success && !updateLoading) {
  //     toast.success("Profile Completed Successfully");
  //     router.push("/dashboard");
  //     router.refresh();
  //   }
  // }, [updateResult, updateLoading]);

  const watchHistory = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg  mx-2 shadow-lg">
        <CardHeader className="">
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* // industry and subindustry selection */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-md">
                Industry
              </Label>
              <Select
                className="w-full"
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((industry) => industry.id === value)
                  );
                  setValue("subIndustry", ""); // Reset subIndustry when industry changes
                }}
              >
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder="select an industry" />
                </SelectTrigger>
                <SelectContent className="">
                  {industries.map((industry) => (
                    <SelectItem value={industry.id} key={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500 text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>
            {watchHistory && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry" className="text-md">
                  Subindustry
                </Label>
                <Select
                  className="w-full"
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className="w-full">
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {selectedIndustry?.subIndustries.map((industry) => (
                      <SelectItem value={industry} key={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-red-500 text-sm">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-md">
                Experience
              </Label>
              <Input
                type="number"
                id="experience"
                min="0"
                max="50"
                placeholder="Years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* skills */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-md">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="e.g. JavaScript, React, Node.js"
                {...register("skills")}
              />
              <p className="text-muted-foreground text-sm">
                Please enter your skills as a comma-separated list.
              </p>
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>

            {/* bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-md">
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                className="h-32"
                placeholder="Tell us about yourself"
                {...register("bio")}
              />

              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
