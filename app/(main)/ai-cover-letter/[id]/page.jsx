import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/coverLetterPreview";

const CoverLetterPage = async ({ params }) => {
  const { id } = await params;

  const coverLetter = await getCoverLetter(id);

  return (
    <div>
      <CoverLetterPreview content={coverLetter.content} />
    </div>
  );
};

export default CoverLetterPage;
