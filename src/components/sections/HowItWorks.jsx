import { motion } from "framer-motion";
import { Upload, Briefcase, Sparkles, MessageSquare, BarChart2, TrendingUp } from "lucide-react";

const steps = [
  { icon: Upload, num: "1", title: "Upload Resume", desc: "Upload your resume and get AI analysis with suggestions.", color: "bg-blue-500" },
  { icon: Briefcase, num: "2", title: "Select Role", desc: "Choose your role, industry, and experience level.", color: "bg-violet-500" },
  { icon: Sparkles, num: "3", title: "AI Generates", desc: "AI generates personalized questions just for you.", color: "bg-pink-500" },
  { icon: MessageSquare, num: "4", title: "Practice & Answer", desc: "Answer in live interview simulation with AI.", color: "bg-amber-500" },
  { icon: BarChart2, num: "5", title: "Get Feedback", desc: "Receive detailed feedback, scores & improvement path.", color: "bg-green-500" },
  { icon: TrendingUp, num: "6", title: "Track & Improve", desc: "Track progress, revisit and improve every day.", color: "bg-red-500" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-violet-600 text-xs font-bold tracking-widest uppercase mb-3 block">
            Built for serious preparation
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Everything You Need. All in One Place.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4 relative`}>
                  <Icon size={22} className="text-white" />
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-white border-2 border-gray-100 text-[9px] font-extrabold text-gray-600 flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{step.title}</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
