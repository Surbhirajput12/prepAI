import { motion } from "framer-motion";
import { CheckCircle2, Mic, Video, Phone } from "lucide-react";

const bullets = [
  "Industry & role-specific questions",
  "Live video simulation with transcripts",
  "AI evaluates your answers in real-time",
  "Get feedback on communication, behavioral, technical & more",
  "Detailed report with scores, metrics, and improvement path",
];

const scores = [
  { label: "Communication", val: 86, color: "#10b981" },
  { label: "Technical", val: 90, color: "#3b82f6" },
  { label: "Problem Solving", val: 75, color: "#f59e0b" },
  { label: "Behavioral", val: 88, color: "#8b5cf6" },
  { label: "Subjective", val: 78, color: "#ec4899" },
];

export default function MockInterview() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-md"
          >
            <span className="text-violet-500 text-xs font-bold tracking-widest uppercase mb-4 block">
              REALISTIC. PERSONALIZED. IMPACTFUL.
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              AI Mock Interviews That
              <br />
              Feel <span className="text-violet-600">100% Real</span>
            </h2>
            <ul className="space-y-3.5 mb-8">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-gray-600 text-sm">
                  <CheckCircle2 size={18} className="text-violet-500 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button className="btn-primary text-white font-semibold px-6 py-3 rounded-xl text-sm">
                Try Mock Interview
              </button>
              <button className="btn-outline text-gray-700 font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2">
                Watch Demo <span className="text-xs">▶</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT - Interview Simulator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs font-semibold text-gray-600">Software Engineer – Frontend</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">⏱ 15:30</span>
              </div>

              <div className="flex gap-0">
                {/* Video area */}
                <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900 min-h-[200px] flex items-center justify-center">
                  <div className="text-6xl">👩‍💼</div>
                  {/* AI suggestion bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                    <p className="text-[10px] text-violet-600 font-semibold">AI Suggestions</p>
                    <p className="text-[10px] text-gray-600">Great explanation! Try adding an example use case.</p>
                  </div>
                </div>

                {/* Transcript + scores */}
                <div className="w-44 border-l border-gray-100 flex flex-col">
                  <div className="p-3 border-b border-gray-100 flex-1">
                    <p className="text-[9px] text-gray-400 font-semibold mb-2">Live Transcript</p>
                    <div className="space-y-2">
                      <div className="bg-violet-50 rounded-lg p-2">
                        <p className="text-[8px] text-gray-500 font-semibold">Interviewer:</p>
                        <p className="text-[8px] text-gray-700">Can you explain the virtual DOM in React?</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-[8px] text-gray-500 font-semibold">You:</p>
                        <p className="text-[8px] text-gray-700">Sure. The virtual DOM is a lightweight JavaScript object that is a copy of the real DOM...</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] text-violet-600 font-semibold mb-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" /> AI Evaluating...
                    </p>
                    {scores.map((s) => (
                      <div key={s.label} className="flex items-center gap-1 mb-1.5">
                        <span className="text-[8px] text-gray-500 w-20 shrink-0">{s.label}</span>
                        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.val}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-full rounded-full"
                            style={{ background: s.color }}
                          />
                        </div>
                        <span className="text-[8px] text-gray-400 font-mono">{s.val}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100 bg-gray-50/60">
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                  <Mic size={14} className="text-gray-600" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                  <Video size={14} className="text-gray-600" />
                </button>
                <button className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shadow-sm hover:bg-red-600 transition">
                  <Phone size={14} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
