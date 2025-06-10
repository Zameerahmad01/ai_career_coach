"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getUserOnboardingStatus } from "@/actions/user";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoaded) return;

      if (!userId) {
        router.push("/sign-in");
        return;
      }

      try {
        const { isOnboarded } = await getUserOnboardingStatus();
        if (isOnboarded) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkAuth();
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null;
  }

  return children;
}
