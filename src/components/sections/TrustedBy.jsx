import { motion } from "framer-motion";

const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Adobe"];

export default function TrustedBy() {
  return (
    <section className="py-10 border-y border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold text-gray-400 tracking-widest mb-8 uppercase"
        >
          Trusted by top performers at
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {companies.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-gray-400 font-bold text-lg lg:text-xl tracking-tight hover:text-violet-500 transition-colors cursor-default"
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
