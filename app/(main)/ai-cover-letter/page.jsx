import { Button } from "@/components/ui/button";
import Link from "next/link";
import CoverLetterList from "./_components/cover-letter-list";
import { getCoverLetters } from "@/actions/cover-letter";

const AiCoverLetterPage = async () => {
  const coverLetters = await getCoverLetters();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="gradient-title text-5xl font-bold mb-4">
          AI Cover Letter Generator
        </h1>
        <Link href={"/ai-cover-letter/new"}>
          <Button>Create New Cover</Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
};

export default AiCoverLetterPage;
