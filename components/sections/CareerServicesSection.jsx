"use client"

import { motion } from "framer-motion"
import { Target, Shield, Zap } from "lucide-react"

const services = [
  {
    icon: Target,
    title: "Career Strategy",
    description: "AI-driven career path analysis and strategic planning",
  },
  {
    icon: Shield,
    title: "Resume Optimization",
    description: "ATS-friendly resume enhancement and keyword optimization",
  },
  {
    icon: Zap,
    title: "Interview Prep",
    description: "AI-powered mock interviews and feedback analysis",
  },
]

export default function CareerServicesSection() {
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
            AI-Powered <span className="text-blue-400">Career Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive career development tools powered by artificial intelligence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <service.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
