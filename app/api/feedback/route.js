import { db } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request) {
  const { transcript, interviewId, userId } = await request.json();
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

    const feedback = await db.feedback.create({
      data: {
        userId: userId,
        interviewId: interviewId,
        score: data.score,
        feedback: data,
      },
    });

    return Response.json(feedback);
  } catch (error) {
    console.error("Error getting interview:", error);
    return Response.json({ error: "Failed to get interview" }, { status: 500 });
  }
}
