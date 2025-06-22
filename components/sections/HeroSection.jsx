"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import TextGenerateEffect from "../ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-4 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="container mx-auto flex flex-col gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 flex flex-col items-center justify-center text-center "
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-white/10"
          >
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">
              AI-powered career transformation
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4 max-w-3xl">
            <TextGenerateEffect
              words="Transform your career with AI coaching"
              className="text-4xl md:text-6xl font-bold leading-tight"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Get personalized career guidance powered by advanced AI. From
              resume optimization to interview preparation and career
              transitions. Start your transformation today.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Explore Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content - Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="glass rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            <Image
              src="/dashboard.png"
              alt="AI Career Coach Dashboard"
              width={1000}
              height={800}
              className="w-full h-auto rounded-lg relative z-10"
            />
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -top-4 -right-4 glass p-4 rounded-xl border border-white/10"
          >
            <div className="text-2xl font-bold text-blue-400">95%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-white/10"
          >
            <div className="text-2xl font-bold text-green-400">10K+</div>
            <div className="text-xs text-gray-400">Careers</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
