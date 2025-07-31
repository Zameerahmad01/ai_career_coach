"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { number: "10K+", label: "Careers Transformed" },
  { number: "95%", label: "Success Rate" },
  { number: "500+", label: "Industry Experts" },
  { number: "24/7", label: "AI Support" },
];

function AnimatedNumber({ value, duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // Show values like '24/7' or anything with a slash, or non-numeric, as-is
    if (
      /\d+\/\d+/.test(value) ||
      /[^\d+,\s+%]/.test(value.replace(/\d|\+|%/g, ""))
    ) {
      setDisplayValue(value);
      return;
    }

    const numericValue = Number.parseInt(value.replace(/[^\d]/g, ""));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentValue = Math.floor(progress * numericValue);
      const suffix = value.replace(/[\d,]/g, "");
      setDisplayValue(currentValue.toLocaleString() + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Career Professionals
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of professionals advancing their careers with AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-2xl border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  <AnimatedNumber value={stat.number} />
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
