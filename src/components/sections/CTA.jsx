import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-3xl px-8 lg:px-16 py-14 border border-violet-100 overflow-hidden flex flex-col lg:flex-row items-center gap-10"
        >
          {/* Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-violet-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/15 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

          {/* Character */}
          <div className="shrink-0 text-7xl lg:text-8xl relative z-10">🤖</div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left relative z-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Your Dream Job is <span className="text-violet-600">Closer Than You Think.</span>
            </h2>
            <p className="text-gray-500 text-base mb-7 max-w-md lg:max-w-none">
              Join thousands of successful candidates who prepared smarter with PrepPilot.
            </p>
            <button className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm">
              Get Started for Free <ArrowRight size={16} />
            </button>
          </div>

          {/* Chart bars decoration */}
          <div className="hidden lg:flex items-end gap-2 shrink-0 relative z-10 h-20">
            {[40, 55, 48, 65, 75, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="w-5 rounded-t-md"
                style={{ background: i === 5 ? "#7c3aed" : i === 4 ? "#a78bfa" : "#ddd6fe" }}
              />
            ))}
            <div className="absolute -top-3 -right-1">🏁</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
