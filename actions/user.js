"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const result = await db.$transaction(
      async (tx) => {
        //check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        //if industry does not exist, create it with ai
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        //update user profile
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            bio: data.bio,
            industry: data.industry,
            experience: data.experience,
            skills: data.skills,
          },
        });

        return {
          success: true,
          user: updatedUser,
          industryInsight,
        };
      },
      {
        timeout: 10000,
      }
    );

    return result;
  } catch (error) {
    console.error("Error updating user and industry", error.message);
    throw new Error(error.message || "Failed to update user profile");
  }
}

export async function getUserOnboardingStatus() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error getting user onboarding status", error.message);
    throw new Error("Failed to get user onboarding status", { cause: error });
  }
}
