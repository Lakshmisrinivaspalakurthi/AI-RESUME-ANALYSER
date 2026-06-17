"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center py-20">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold"
      >
        AI Resume Analyzer
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-xl text-slate-300"
      >
        ATS Analysis, Skill Gap Detection,
        Career Recommendations and AI Guidance.
      </motion.p>

    </section>
  );
}
