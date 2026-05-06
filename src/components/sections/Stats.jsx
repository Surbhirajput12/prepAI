import { motion } from "framer-motion";
import { Users, Video, SmilePlus, Building2 } from "lucide-react";

const stats = [
  { icon: Users, value: "10K+", label: "Active Users", color: "bg-violet-50", iconColor: "text-violet-600" },
  { icon: Video, value: "50K+", label: "Mock Interviews", color: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: SmilePlus, value: "95%", label: "Satisfaction Rate", color: "bg-green-50", iconColor: "text-green-600" },
  { icon: Building2, value: "200+", label: "Top Companies Questions", color: "bg-pink-50", iconColor: "text-pink-600" },
];

export default function Stats() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={s.iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900 leading-none">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
