// import heroImg from "../../assets/hero-imag.jpeg";
// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="py-24 bg-[#F8F9FC]">
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-20">

//         {/* LEFT */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-xl space-y-6"
//         >
//           <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm">
//             AI-Powered Interview Prep
//           </span>

//           <h1 className="text-6xl font-bold leading-tight text-gray-900">
//             <span className="text-purple-600">Crack Interviews.</span>
//             <br />
//             Land Your Dream Role.
//           </h1>

//           <p className="text-gray-500 text-lg">
//             Practice smarter with AI mock interviews, real-time feedback,
//             and personalized insights.
//           </p>

//           <div className="flex gap-4">
//             <button className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
//               Get Started Free
//             </button>

//             <button className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition">
//               See How It Works
//             </button>
//           </div>

//           <p className="text-sm text-gray-500">
//             ⭐ 4.9 | Loved by 10,000+ users
//           </p>
//         </motion.div>

//         {/* RIGHT */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7 }}
//           className="relative w-[520px] h-[520px] flex items-center justify-center"
//         >

//           {/* Glow */}
//           <div className="absolute w-[400px] h-[400px] bg-purple-300 opacity-30 blur-3xl rounded-full"></div>

//           {/* Main Image */}
//           <img
//             src={heroImg}
//             className="relative z-10 w-[420px] object-contain"
//           />

//           {/* FLOATING CARDS */}

//           {/* Score Card */}
//           <div className="absolute top-0 right-0 bg-white px-5 py-4 rounded-xl shadow-lg">
//             <p className="text-xs text-gray-400">Overall Score</p>
//             <p className="text-xl font-bold text-purple-600">78%</p>
//           </div>

//           {/* Strength Card */}
//           <div className="absolute left-0 top-[140px] bg-white px-4 py-3 rounded-xl shadow-md text-sm">
//             <p className="font-medium">Communication ✔</p>
//             <p className="text-gray-400 text-xs">Strong</p>
//           </div>

//           {/* Radar Card */}
//           <div className="absolute right-[-40px] top-[160px] bg-white px-4 py-3 rounded-xl shadow-md">
//             <p className="text-xs text-gray-400 mb-1">Performance</p>
//             <div className="w-[120px] h-[80px] bg-purple-100 rounded-md"></div>
//           </div>

//           {/* Interviews Card */}
//           <div className="absolute bottom-0 right-[20px] bg-white px-5 py-4 rounded-xl shadow-md">
//             <p className="text-xs text-gray-400">Interviews</p>
//             <p className="text-lg font-bold">12</p>
//           </div>

//         </motion.div>

//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import heroImg from "../../assets/hero-imag.jpeg";
import { Star, TrendingUp } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="hero-mesh pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-6">

          {/* LEFT */}
          <div className="flex-1 max-w-xl">
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-violet-100 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                AI-POWERED INTERVIEW PREP ✦
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.18)} className="text-4xl lg:text-5xl xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900 mb-5">
              <span className="text-violet-600">Crack Interviews.</span>
              <br />
              Land Your Dream Role.
            </motion.h1>

            <motion.p {...fadeUp(0.26)} className="text-gray-500 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
              PrepPilot is your all-in-one AI interview copilot that helps you
              prepare smarter with personalized practice, real-time feedback,
              and data-driven insights.
            </motion.p>

            <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-3 mb-8">
              <button className="btn-primary text-white font-semibold px-6 py-3 rounded-xl text-sm">
                Get Started Free
              </button>
              <button className="btn-outline text-gray-700 font-semibold px-6 py-3 rounded-xl text-sm flex items-center gap-2">
                See How It Works
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">▶</span>
              </button>
            </motion.div>

            <motion.div {...fadeUp(0.38)} className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#f59e0b","#8b5cf6","#10b981","#3b82f6","#ef4444"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c }}>
                    {["A","B","C","D","E"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                  <span className="text-gray-800 text-sm font-bold ml-1">4.9/5</span>
                </div>
                <p className="text-gray-400 text-xs">Loved by 10,000+ job seekers</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex-1 flex items-center justify-center w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-violet-200/30 blur-3xl" />
            </div>

            <img src={heroImg} alt="PrepPilot mascot" className="relative z-10 w-64 lg:w-72 xl:w-80 object-contain drop-shadow-2xl float" />

            {/* Score card */}
            <div className="glass-card absolute top-0 right-0 z-20 rounded-2xl px-4 py-3.5 float2 w-44">
              <p className="text-[10px] text-gray-400 font-medium mb-1">Overall Score</p>
              <span className="text-3xl font-extrabold text-violet-600">78%</span>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-violet-500 to-violet-300" />
              </div>
              <p className="text-[10px] text-green-500 font-semibold mt-1.5">Keep going! Doing great.</p>
            </div>

            {/* Skill bars card */}
            <div className="glass-card absolute left-0 top-1/3 z-20 rounded-2xl px-4 py-3.5 float3 hidden lg:block">
              {[
                { label: "Strengths", val: 80, color: "#10b981" },
                { label: "Communication", val: 72, color: "#8b5cf6" },
                { label: "Problem Solving", val: 65, color: "#f59e0b" },
                { label: "Technical", val: 88, color: "#3b82f6" },
                { label: "Behavioral", val: 70, color: "#ec4899" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                  <span className="text-[9px] text-gray-500 w-20 shrink-0">{s.label}</span>
                  <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${s.val}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Interviews card */}
            <div className="glass-card absolute bottom-4 right-0 z-20 rounded-2xl px-4 py-3 float">
              <p className="text-[10px] text-gray-400 font-medium">Interviews Taken</p>
              <div className="flex items-end gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-gray-900">12</span>
                <span className="text-[10px] text-green-500 font-semibold mb-0.5 flex items-center gap-0.5">
                  <TrendingUp size={10} /> +20%
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
