export const dynamic = "force-dynamic";

import { industries } from "@/data/industries";
import OnboardingForm from "./_components/OnboardingForm";
import AuthCheck from "./_components/AuthCheck";

const Onboarding = () => {
  return (
    <main>
      <AuthCheck>
        <OnboardingForm industries={industries} />
      </AuthCheck>
    </main>
  );
};

export default Onboarding;
