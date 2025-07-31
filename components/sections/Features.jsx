import { Brain, Target, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";

function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI Career Coaching{" "}
            <span className="text-blue-400">Core Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Experience cutting-edge AI technology designed specifically for
            career transformation and professional growth acceleration.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y divide-white/10 border border-white/10 glass rounded-2xl *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3 group hover:bg-blue-500/5 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Zap className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Lightning Fast Analysis
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Instantly generate AI-powered resumes, cover letters, and
              interview prep using Google's Gemini API for rapid, tailored
              career materials.
            </p>
          </div>

          <div className="space-y-3 group hover:bg-blue-500/5 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Brain className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Advanced AI Engine
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Advanced Gemini AI analyzes your experience, skills, and job goals
              to deliver hyper-personalized recommendations and actionable
              feedback.
            </p>
          </div>

          <div className="space-y-3 group hover:bg-blue-500/5 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Shield className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Enterprise Security
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Secure authentication with Clerk and robust data protection.
              Background tasks (like weekly industry insights) handled safely
              with Inngest.
            </p>
          </div>

          <div className="space-y-3 group hover:bg-blue-500/5 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Target className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Tailored Strategies
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Realistic, voice-based mock interviews powered by Vapi AI agents,
              tailored to your target job roles and industries.
            </p>
          </div>

          <div className="space-y-3 group hover:bg-blue-500/5 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <TrendingUp className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Progress Analytics
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Automated, role-specific technical and behavioral interview
              questions generated with Gemini API. Track your progress and get
              analytics with Prisma + Neon PostgreSQL.
            </p>
          </div>

          <div className="space-y-3 group hover:bg-blue-500/5 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Sparkles className="size-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Market Intelligence
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Weekly, AI-curated industry insights and emerging skill trends
              delivered right to your dashboard. Beautiful, intuitive UI with
              Tailwind CSS and Shadcn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
