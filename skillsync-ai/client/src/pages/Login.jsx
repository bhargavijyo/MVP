import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-slate-400">Continue your learning journey with SkillSync AI</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="password"
              placeholder="Password"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full gradient-bg text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400">
          Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
