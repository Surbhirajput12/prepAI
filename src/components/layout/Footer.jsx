import { Zap, Globe, Link, Share, ExternalLink } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Updates", "Roadmap"],
  Resources: ["Blog", "Interview Tips", "Cheat Sheets", "Help Center"],
  Company: ["About Us", "Careers", "Contact", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Zap size={15} className="text-white fill-white" />
              </div>
              <span className="font-bold text-gray-900 text-[17px] tracking-tight">PrepPilot</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered interview preparation platform to help you practice, improve, and land your dream job.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Link, Share, ExternalLink].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-violet-100 hover:text-violet-600 flex items-center justify-center text-gray-500 transition-colors">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-5">{group}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 text-sm hover:text-violet-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-5">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Subscribe to get tips and updates.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email"
                className="flex-1 min-w-0 text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition" />
              <button className="btn-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl shrink-0">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2025 PrepPilot. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map(l => (
              <a key={l} href="#" className="text-gray-400 text-sm hover:text-violet-500 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
