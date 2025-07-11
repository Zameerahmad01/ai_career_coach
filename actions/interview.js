"use server";

import { model } from "@/lib/ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
      Generate 10 technical interview questions for a ${
        user.industry
      } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
      
      Each question should be multiple choice with 4 options.
      
      Return the response in this JSON format only, no additional text:
      {
        "questions": [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": "string",
            "explanation": "string"
          }
        ]
      }
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
    let quiz;
    try {
      quiz = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Raw model response (for debugging):", text);
      throw new Error("Failed to parse quiz JSON. Please try again.");
    }
    if (!quiz.questions) {
      throw new Error("Quiz JSON does not contain questions array.");
    }
    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Implement logic to save quiz results

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  //generate improvement tip based on wrong answers
  let improvementTip = null;
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: ${q.question}\nYour Answer: ${q.userAnswer}\nCorrect Answer: ${q.answer}\n`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  // Save the quiz result to the database
  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error getting assessments:", error);
    throw new Error("Failed  to get assessments");
  }
}
