import Link from "next/link";
import CoverLetterGenerator from "../_components/CoverLetterGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <Link href={"/ai-cover-letter"}>
          <Button variant="Link" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
        <h1 className="gradient-title text-5xl font-bold mb-4">
          Generate Cover Letter
        </h1>
      </div>

      <CoverLetterGenerator />
    </div>
  );
};

export default page;
