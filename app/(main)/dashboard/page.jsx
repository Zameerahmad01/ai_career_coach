import React from "react";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/Dashboard-view";
import { getIndustryInsights } from "@/actions/dashboard";

const IndustryInsightPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container">
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsightPage;
