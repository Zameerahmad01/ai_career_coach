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
              Get instant AI-powered career insights and personalized
              recommendations within seconds of input.
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
              Sophisticated machine learning algorithms analyze market trends
              and career trajectories for optimal guidance.
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
              Bank-level encryption and privacy protection ensure your
              professional data remains completely confidential.
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
              Customized career roadmaps based on your unique skills,
              experience, and professional aspirations.
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
              Comprehensive tracking of career milestones with detailed
              performance metrics and achievement insights.
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
              Stay ahead with predictive insights on emerging skills, industry
              shifts, and future career opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
