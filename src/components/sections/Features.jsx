// import { FileText, Video, BarChart, BookOpen, MessageSquare, Brain } from "lucide-react";

// const features = [
//   { title: "Resume Builder", icon: <FileText size={22} />, color: "bg-purple-100" },
//   { title: "Mock Interviews", icon: <Video size={22} />, color: "bg-blue-100" },
//   { title: "Reports", icon: <BarChart size={22} />, color: "bg-green-100" },
//   { title: "Cheat Sheets", icon: <BookOpen size={22} />, color: "bg-yellow-100" },
//   { title: "Top Questions", icon: <MessageSquare size={22} />, color: "bg-pink-100" },
//   { title: "Role Matching", icon: <Brain size={22} />, color: "bg-indigo-100" },
// ];

// export default function Features() {
//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-6">

//         <h2 className="text-3xl font-bold text-center">
//           Everything You Need to Ace Every Round
//         </h2>

//         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mt-12">    
//               {features.map((item, i) => (
//             <div
//   key={i}
//   className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition duration-300"
// >
//   <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
//     {item.icon}
//   </div>

//   <h3 className="font-semibold text-lg text-gray-900">
//     {item.title}
//   </h3>

//   <p className="text-gray-500 text-sm mt-2 leading-relaxed">
//     AI-powered feature designed to help you prepare better.
//   </p>

//   <p className="mt-4 text-purple-600 text-sm font-medium">
//     Learn more →
//   </p>
// </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import { FileText, Video, BarChart2, BookOpen, Star, Target, ArrowRight } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Builder & Analyzer",
    desc: "Build a recruiter-friendly resume and get AI-powered analysis with improvement suggestions.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    img: "📄",
  },
  {
    icon: Video,
    title: "Mock Interviews",
    desc: "Practice with AI interviewers based on your role, industry, and experience level.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    img: "🎥",
  },
  {
    icon: BarChart2,
    title: "Interview Reports",
    desc: "Get detailed feedback on your performance, scores, and areas of improvement.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    img: "📊",
  },
  {
    icon: BookOpen,
    title: "Cheat Sheets & Papers",
    desc: "Access domain-wise cheat sheets, interview tips, and curated practice papers.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    img: "📚",
  },
  {
    icon: Star,
    title: "Top Company Questions",
    desc: "Prepare with real interview questions, interview tips, at top companies.",
    color: "bg-pink-50",
    iconColor: "text-pink-600",
    img: "🏆",
  },
  {
    icon: Target,
    title: "Job Role Integration",
    desc: "Get role-specific prep for SDE, FSO, AI/ML, Data, PM and more.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    img: "🎯",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-violet-600 text-xs font-bold tracking-widest uppercase mb-3 block">
            Powerful Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Everything You Need to Ace Every Round
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="feature-card rounded-2xl p-6 cursor-pointer group"
              >
                <div className={`w-10 h-10 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={f.iconColor} />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{f.desc}</p>

                {/* Mini visual placeholder */}
                <div className={`w-full h-24 ${f.color} rounded-xl flex items-center justify-center text-3xl mb-5`}>
                  {f.img}
                </div>

                <button className="flex items-center gap-1.5 text-violet-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
