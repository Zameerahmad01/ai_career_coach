import { model } from "@/lib/ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function GET() {
  return Response.json(
    {
      succuss: true,
      message: "VAPI API is working",
    },
    { status: 200 }
  );
}

export async function POST(request) {
  const { role, level, amount, userid, techstack, type } = await request.json();

  const prompt = `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
        `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // Remove code fences and trim
    let cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    // Try to extract JSON object using regex
    const match = cleanedText.match(/\{[\s\S]*\}/);
    if (match) {
      cleanedText = match[0];
    }
    // Remove trailing commas (common LLM issue)
    cleanedText = cleanedText.replace(/,\s*([}\]])/g, "$1");

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (e) {
      // fallback: return as string if parsing fails
      parsedData = cleanedText;
    }

    const formattedTechStack = techstack.split(",").map((tech) => tech.trim());
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userid,
      },
    });
    const interview = await db.interview.create({
      data: {
        role,
        level,
        type,
        techStack: formattedTechStack,
        questions: parsedData,
        userId: user.id,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Interview questions generated successfully",
        data: interview,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in VAPI API", error);
    return Response.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   return Response.json(
//     {
//       success: true,
//       message: "VAPI POST API is working",
//     },
//     { status: 200 }
//   );
// }
