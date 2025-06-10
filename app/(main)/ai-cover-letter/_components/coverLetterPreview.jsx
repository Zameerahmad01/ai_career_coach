"use client";

import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="">
      <div>
        <Link href={"/ai-cover-letter"}>
          <Button variant="Link" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
        <h1 className="gradient-title text-5xl font-bold mb-4">
          Cover Letter Preview
        </h1>
      </div>
      <div className="border rounded-lg">
        <MDEditor value={content} height={800} preview="preview" />
      </div>
    </div>
  );
};

export default CoverLetterPreview;
