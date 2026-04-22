import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Zap, BarChart3,
  Shield, Rocket, Globe, BookOpen, Flame, Check, Star
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Landing() {
  const features = [
    { icon: BookOpen, title: "Dynamic Study Plans", desc: "Create modular study plans tailored to your specific learning path and upcoming deadlines." },
    { icon: Flame, title: "Habit Streaks", desc: "Build consistency with streak-based tracking and daily completion reminders." },
    { icon: BarChart3, title: "Rich Analytics", desc: "Visualize your progress with high-performance charts and real-time activity data." },
    { icon: Zap, title: "Fast Tracking", desc: "One-click updates to keep your workflow focused and uninterrupted." },
    { icon: Shield, title: "Encrypted Data", desc: "Your personal growth data is secured with industry-standard JWT encryption." },
    { icon: Globe, title: "Multi-Platform", desc: "Access your learning state seamlessly from any device, anywhere." },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      tagline: "Perfect to get started",
      color: "border-slate-700",
      btnClass: "border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
      features: ["5 Study Plans", "3 Habit Trackers", "Basic Analytics", "JWT Auth"],
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      tagline: "Most popular",
      color: "border-indigo-500/60 bg-indigo-500/5",
      badge: "Most Popular",
      btnClass: "gradient-bg hover:opacity-90",
      features: ["Unlimited Plans", "Unlimited Habits", "Advanced Analytics", "Priority Support", "CSV Export"],
    },
    {
      name: "Premium",
      price: "$19",
      period: "/month",
      tagline: "For power learners",
      color: "border-purple-500/40",
      btnClass: "border border-purple-500 text-purple-400 hover:bg-purple-500/10",
      features: ["Everything in Pro", "AI Recommendations", "Team Workspaces", "Custom Integrations", "Dedicated Support"],
    },
  ];

  const testimonials = [
    { name: "Arjun Sharma", role: "CS Student", text: "SkillSync AI completely transformed how I prepare for exams. The habit streaks keep me accountable every single day.", stars: 5 },
    { name: "Priya Nair", role: "Self-taught Developer", text: "I've tried dozens of productivity tools. This is the only one that actually stuck. The dashboard feels premium.", stars: 5 },
    { name: "Rohan Mehta", role: "UPSC Aspirant", text: "The study plan system is exactly what I needed. Clean, fast, and gets out of my way.", stars: 5 },
  ];

  return (
    <div className="bg-[#0f172a] text-white min-h-screen selection:bg-indigo-500 selection:text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-xl bg-[#0f172a]/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30">S</div>
          <span className="font-bold text-xl tracking-tight">SkillSync AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2">Sign In</Link>
          <Link to="/signup" className="gradient-bg px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-36 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Version 1.0 is now live 🎉
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Optimize Your Learning.<br />
            <span className="gradient-text">Sync Your Growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The all-in-one micro-SaaS for students and developers to track study plans,
            build habits, and visualize progress — beautifully.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="w-full sm:w-auto gradient-bg px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-xl text-lg font-bold transition-all border border-slate-700">
              Explore Features
            </a>
          </motion.div>

          {/* Dashboard Mock Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-20 mx-auto max-w-5xl"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10 bg-slate-900/80 backdrop-blur-xl p-3">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="flex-1 mx-4 bg-slate-800 rounded-md h-5" />
              </div>
              <div className="bg-[#0f172a] rounded-xl p-6 grid grid-cols-4 gap-4">
                <div className="col-span-1 space-y-3">
                  {["Dashboard", "Study Plans", "Habits"].map(item => (
                    <div key={item} className={`h-9 rounded-lg flex items-center px-3 gap-2 text-xs font-medium ${item === "Dashboard" ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800/50 text-slate-500"}`}>
                      <div className="w-3 h-3 bg-current rounded-sm opacity-60" />{item}
                    </div>
                  ))}
                </div>
                <div className="col-span-3 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {["Total Plans", "Completed", "Streak"].map((s, i) => (
                      <div key={s} className="bg-slate-800/50 rounded-xl p-3">
                        <div className="text-xs text-slate-500 mb-1">{s}</div>
                        <div className={`text-xl font-bold ${i === 0 ? "text-blue-400" : i === 1 ? "text-emerald-400" : "text-orange-400"}`}>{["12", "9", "🔥 7"][i]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 h-24 flex items-end gap-2">
                    {[60, 90, 45, 75, 100, 55, 80].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 4 ? "#6366f1" : "#1e293b" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "10k+", label: "Plans Created" },
            { value: "99%", label: "Consistency Rate" },
            { value: "5k+", label: "Active Users" },
            { value: "Free", label: "Community Tier" },
          ].map(({ value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2 gradient-text">{value}</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4">Features</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
              Precision Tools for Modern Learners
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to master your craft and build unstoppable consistency.
            </motion.p>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx} variants={fadeUp}
                className="p-8 rounded-2xl border border-white/5 bg-slate-900 hover:border-indigo-500/40 hover:-translate-y-1 transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4">Pricing</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-slate-400 max-w-xl mx-auto">
              Start free. Upgrade when you're ready. No hidden fees, ever.
            </motion.p>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {plans.map(({ name, price, period, tagline, color, badge, btnClass, features: f }) => (
              <motion.div
                key={name} variants={fadeUp}
                className={`relative flex flex-col p-8 rounded-2xl border ${color} transition-all hover:-translate-y-1`}
              >
                {badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-indigo-500/30">
                    {badge}
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-slate-400 text-sm mb-1">{tagline}</p>
                  <h3 className="text-2xl font-bold mb-3">{name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold">{price}</span>
                    <span className="text-slate-400 mb-2">{period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {f.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${btnClass}`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4">Testimonials</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold">
              Loved by Learners
            </motion.h2>
          </div>
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map(({ name, role, text, stars }) => (
              <motion.div key={name} variants={fadeUp} className="glass-morphism p-8 rounded-2xl flex flex-col gap-4">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}
                </div>
                <p className="text-slate-300 leading-relaxed text-sm flex-1">"{text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-slate-900/40">
        <div className="max-w-4xl mx-auto text-center glass-morphism p-12 md:p-20 rounded-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-4">
              Ready to sync your craft?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-400 mb-10 text-lg">
              Join thousands of learners who are leveling up every day with SkillSync AI.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Link to="/signup" className="inline-flex items-center gap-2 gradient-bg px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-2xl shadow-indigo-500/30">
                Start Building Today <Rocket className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center font-bold text-xs">S</div>
            <span className="font-bold">SkillSync AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 SkillSync AI. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
