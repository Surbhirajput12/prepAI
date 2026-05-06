// export default function Navbar() {
//   return (
//     <nav className="bg-white p-4 shadow">
//       <h1 className="text-xl font-bold">PrepAI Navbar</h1>
//     </nav>
//   );
// }
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Zap } from "lucide-react";

const navItems = [
  { label: "Features", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Pricing" },
  { label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap size={15} className="text-white fill-white" />
            </div>
            <span className="font-bold text-gray-900 text-[17px] tracking-tight">PrepPilot</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.label} className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                {item.label}
                {item.hasDropdown && <ChevronDown size={14} className="opacity-60" />}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all">Log in</button>
            <button className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl">Get Started Free →</button>
          </div>

          <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-100 shadow-lg px-6 py-5 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button key={item.label} className="flex items-center justify-between px-3 py-3 text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all">
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} />}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
                <button className="w-full py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl">Log in</button>
                <button className="btn-primary w-full py-3 text-sm font-semibold text-white rounded-xl">Get Started Free</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
