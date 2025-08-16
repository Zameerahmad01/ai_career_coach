"use server";

import { model } from "@/lib/ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

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

export async function getInterviews() {
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
    const assessments = await db.Interview.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        feedback: true,
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error getting interviews:", error);
    throw new Error("Failed  to get interviews");
  }
}

export const getInterviewById = async (id) => {
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
    const interview = await db.Interview.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        feedback: true,
      },
    });

    return interview;
  } catch (error) {
    console.error("Error getting interview:", error);
    throw new Error("Failed  to get interview");
  }
};

export const generateFeedback = async (params) => {
  const { interviewId, transcript, feedbackId } = params;

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
    const formattedTranscript = transcript.map(
      (sentence) => `- ${sentence.role}: ${sentence.content}\n`
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}
  
        Please provide:
        1. An overall score from 0-100
        2. Detailed feedback covering:
           - Communication Skills
           - Technical Knowledge
           - Problem-Solving
           - Cultural & Role Fit
           - Confidence & Clarity
        `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            score: {
              type: "number",
              description: "Overall score out of 100",
            },
            finalAssessment: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Detailed feedback about the interview performance",
            },
            strengths: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Strengths of the candidate",
            },
            areasForImprovement: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Areas for improvement of the candidate",
            },
          },
          required: [
            "score",
            "finalAssessment",
            "strengths",
            "areasForImprovement",
          ],
        },
      },
    });

    const data = await JSON.parse(response.candidates[0].content.parts[0].text);

    if (feedbackId) {
      const feedback = await db.feedback.update({
        where: {
          id: feedbackId,
        },
        data: {
          score: score,
          feedback: data,
        },
      });
      return { success: true, feedbackId: feedback.id };
    } else {
      const feedback = await db.feedback.create({
        data: {
          userId: userId,
          interviewId: interviewId,
          score: score,
          feedback: data,
        },
      });
      return { success: true, feedbackId: feedback.id };
    }
  } catch (error) {
    console.error("Error generating feedback:", error);
    return { error: "Failed to generate feedback" };
  }
};

export const getFeedbackByInterviewId = async (interviewId) => {
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
    const feedback = await db.feedback.findUnique({
      where: {
        interviewId: interviewId,
        userId: user.id,
      },
    });

    return feedback;
  } catch (error) {
    console.error("Error getting feedback:", error);
    throw new Error("Failed  to get feedback");
  }
};
