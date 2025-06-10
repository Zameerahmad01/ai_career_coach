"use client";

import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/app/lib/schema";
import { saveResume } from "@/actions/resume";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EntryForm } from "./Entry-form";
import { useUser } from "@clerk/nextjs";
import MDEditor from "@uiw/react-md-editor";
import { entriesToMarkdown } from "@/app/lib/helper";
// import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const saveResumeMutation = useMutation({
    mutationFn: ({ content }) => saveResume(content),
    onSuccess: (data) => {
      toast.success("resume saved successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (initialContent) {
      setActiveTab("preview");
    }
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  //   const generatePDF = async () => {
  //     setIsGenerating(true);
  //     try {
  //       const element = document.getElementById("resume-pdf");
  //       if (!element) {
  //         throw new Error("Resume content element not found");
  //       }

  //       const opt = {
  //         margin: [15, 15],
  //         filename: "resume.pdf",
  //         image: { type: "jpeg", quality: 0.98 },
  //         html2canvas: {
  //           scale: 2,
  //           useCORS: true,
  //           logging: false,
  //           backgroundColor: "#ffffff",
  //           allowTaint: true,
  //           foreignObjectRendering: true,
  //         },
  //         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //       };

  //       const worker = html2pdf().set(opt);
  //       await worker.from(element).save();
  //     } catch (error) {
  //       console.error("PDF generation error:", error);
  //       toast.error("Failed to generate PDF. Please try again.");
  //     } finally {
  //       setIsGenerating(false);
  //     }
  //   };

  const onSubmit = () => {
    saveResumeMutation.mutate({
      content: previewContent,
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
        <h1 className="gradient-title text-5xl font-bold mb-4">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button
            className={"bg-blue-500 hover:bg-blue-600 text-white"}
            onClick={onSubmit}
            disabled={saveResumeMutation.isPending}
          >
            {saveResumeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
          <Button disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">MarkDown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <form className="space-y-8">
            {/* contact info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 border gap-4 p-4 rounded-lg bg-muted/50">
                {/* email */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    {...register("contactInfo.email")}
                    error={errors.contactInfo?.email}
                    placeholder="your@gmail.com"
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                {/* mobile */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="mobile">
                    Mobile
                  </Label>
                  <Input
                    type="tel"
                    id="mobile"
                    {...register("contactInfo.mobile")}
                    error={errors.contactInfo?.mobile}
                    placeholder="+92301000000"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>
                {/* linkedin */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="linkedin">
                    Linkedin
                  </Label>
                  <Input
                    type="url"
                    id="linkedin"
                    {...register("contactInfo.linkedin")}
                    error={errors.contactInfo?.linkedin}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>
                {/* twitter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="twitter">
                    Twitter
                  </Label>
                  <Input
                    type="url"
                    id="twitter"
                    {...register("contactInfo.twitter")}
                    error={errors.contactInfo?.twitter}
                    placeholder="https://x.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* professional summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Summary</h3>

              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write a brief summary of your professional background and career goals."
                    className="h-32"
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>

            {/* skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills</h3>

              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="list your key skills"
                    className="h-32"
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Experience</h3>

              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>

              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>

            {/* projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>

              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Projects"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          {/* <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
