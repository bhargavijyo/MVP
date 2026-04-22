import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from "recharts";
import {
  CheckCircle2, Circle, Plus, Calendar, BookOpen, Flame,
  LogOut, LayoutDashboard, Trash2, X, Target, TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [plans, setPlans] = useState([]);
  const [habits, setHabits] = useState([]);
  const { logout, user } = useContext(AuthContext);

  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({ subject: "", topic: "", deadline: "" });

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", frequency: "daily" });

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [plansRes, habitsRes] = await Promise.all([
        API.get("/plans"),
        API.get("/habits"),
      ]);
      setPlans(plansRes.data);
      setHabits(habitsRes.data);
    } catch (err) { console.error(err); }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      await API.post("/plans", newPlan);
      setNewPlan({ subject: "", topic: "", deadline: "" });
      setShowAddPlan(false);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeletePlan = async (id) => {
    try {
      await API.delete(`/plans/${id}`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/habits", newHabit);
      setNewHabit({ name: "", frequency: "daily" });
      setShowAddHabit(false);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleCompleteHabit = async (id) => {
    try {
      await API.put(`/habits/${id}/complete`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await API.delete(`/habits/${id}`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const togglePlanStatus = async (plan) => {
    try {
      const newStatus = plan.status === "completed" ? "pending" : "completed";
      await API.put(`/plans/${plan._id}`, { status: newStatus });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const completed = plans.filter(p => p.status === "completed").length;
  const pending = plans.filter(p => p.status === "pending").length;
  const completionRate = plans.length > 0 ? Math.round((completed / plans.length) * 100) : 0;

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];
  const COLORS = ["#6366f1", "#334155"];

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "plans", icon: BookOpen, label: "Study Plans" },
    { id: "habits", icon: Flame, label: "Habits" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex text-slate-100">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 border-r border-slate-800 flex flex-col items-center md:items-start p-4 md:p-6 space-y-8 shrink-0">
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">S</div>
          <span className="hidden md:block font-bold text-xl tracking-tight">SkillSync AI</span>
        </div>

        <nav className="flex-1 space-y-2 w-full">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === id
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden md:block text-sm font-medium">{label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700 w-full">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center font-bold text-sm">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden md:block text-sm font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-slate-400 mt-1">Track your learning progress at a glance.</p>
              </div>
              <button
                onClick={() => setShowAddPlan(true)}
                className="gradient-bg px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
              >
                <Plus className="w-5 h-5" /> New Plan
              </button>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Plans", value: plans.length, icon: Target, color: "text-blue-400 bg-blue-500/10" },
                { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
                { label: "Pending", value: pending, icon: Circle, color: "text-amber-400 bg-amber-500/10" },
                { label: "Completion", value: `${completionRate}%`, icon: TrendingUp, color: "text-indigo-400 bg-indigo-500/10" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="glass-morphism p-5 rounded-2xl flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
                    <p className="text-2xl font-bold mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Charts */}
              <section className="lg:col-span-2 space-y-6">
                <div className="glass-morphism p-6 rounded-2xl">
                  <h3 className="font-bold mb-6 text-lg flex items-center gap-2">
                    Study Overview
                    <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{plans.length} plans</span>
                  </h3>
                  {plans.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={chartData} barSize={52}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", color: "#f8fafc" }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[220px] flex flex-col items-center justify-center text-slate-500">
                      <BookOpen className="w-12 h-12 mb-3 opacity-30" />
                      <p>No plans yet. Create your first study plan!</p>
                    </div>
                  )}
                </div>

                {/* Habit Streaks */}
                <div className="glass-morphism p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Habit Streaks</h3>
                    <button
                      onClick={() => setShowAddHabit(true)}
                      className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Habit
                    </button>
                  </div>
                  {habits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {habits.map((habit) => (
                        <motion.div
                          key={habit._id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-slate-900/60 rounded-xl p-4 flex items-center justify-between border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer group"
                          onClick={() => handleCompleteHabit(habit._id)}
                        >
                          <div>
                            <p className="font-semibold">{habit.name}</p>
                            <p className="text-xs text-slate-400 capitalize mt-0.5">{habit.frequency}</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-orange-500 flex items-center gap-1 text-sm bg-orange-500/10 px-3 py-1 rounded-full font-bold">
                              <Flame className="w-4 h-4" /> {habit.streak}
                            </span>
                            <span className="text-xs text-slate-500 mt-1">streak</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                      <Flame className="w-12 h-12 mb-3 opacity-30" />
                      <p>No habits yet. Start building your streaks!</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Recent Plans */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  Recent Tasks
                  <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-1 rounded-full">{plans.length}</span>
                </h3>
                <div className="space-y-3">
                  <AnimatePresence>
                    {plans.slice(0, 8).map((plan) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={plan._id}
                        className="glass-morphism p-4 rounded-2xl flex items-center gap-3 hover:border-indigo-500/30 transition-all group"
                      >
                        <button
                          onClick={() => togglePlanStatus(plan)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${plan.status === "completed"
                            ? "bg-indigo-500 text-white"
                            : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                            }`}
                        >
                          {plan.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm truncate ${plan.status === "completed" ? "line-through text-slate-500" : ""}`}>{plan.topic}</h4>
                          <p className="text-xs text-slate-400 truncate">{plan.subject}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(plan.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeletePlan(plan._id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400/60 hover:text-red-400 transition-all p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {plans.length === 0 && (
                    <div className="glass-morphism p-8 rounded-2xl text-center text-slate-500">
                      <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No study plans yet.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {/* ── PLANS TAB ── */}
        {activeTab === "plans" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Study Plans</h1>
                <p className="text-slate-400 mt-1">Manage all your study goals and deadlines.</p>
              </div>
              <button
                onClick={() => setShowAddPlan(true)}
                className="gradient-bg px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" /> New Plan
              </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {plans.map((plan) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={plan._id}
                    className="glass-morphism p-6 rounded-2xl hover:border-indigo-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${plan.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {plan.status === "completed" ? "✓ Completed" : "● Pending"}
                      </span>
                      <button
                        onClick={() => handleDeletePlan(plan._id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400/60 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${plan.status === "completed" ? "line-through text-slate-500" : ""}`}>{plan.topic}</h3>
                    <p className="text-slate-400 text-sm mb-4">{plan.subject}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(plan.deadline).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => togglePlanStatus(plan)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                      >
                        {plan.status === "completed" ? "Mark Pending" : "Mark Done"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {plans.length === 0 && (
                <div className="col-span-full glass-morphism p-16 rounded-2xl text-center text-slate-500">
                  <BookOpen className="w-14 h-14 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No study plans yet</p>
                  <p className="text-sm mt-1">Click "New Plan" to create your first one.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── HABITS TAB ── */}
        {activeTab === "habits" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Habit Tracker</h1>
                <p className="text-slate-400 mt-1">Build consistency, one streak at a time.</p>
              </div>
              <button
                onClick={() => setShowAddHabit(true)}
                className="gradient-bg px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" /> New Habit
              </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {habits.map((habit) => (
                <motion.div
                  key={habit._id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-morphism p-6 rounded-2xl cursor-pointer hover:border-orange-500/30 transition-all"
                  onClick={() => handleCompleteHabit(habit._id)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <Flame className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-slate-400 capitalize bg-slate-800 px-3 py-1 rounded-full">{habit.frequency}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteHabit(habit._id);
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div onClick={() => handleCompleteHabit(habit._id)}>
                    <h3 className="text-xl font-bold mb-1">{habit.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">Tap to mark complete for today</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-extrabold text-orange-400">{habit.streak}</p>
                        <p className="text-xs text-slate-500">day streak</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Last done</p>
                        <p className="text-sm font-medium">{habit.lastCompleted ? new Date(habit.lastCompleted).toLocaleDateString() : "Never"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {habits.length === 0 && (
                <div className="col-span-full glass-morphism p-16 rounded-2xl text-center text-slate-500">
                  <Flame className="w-14 h-14 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No habits yet</p>
                  <p className="text-sm mt-1">Click "New Habit" to start your first streak.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* ── Add Plan Modal ── */}
      <AnimatePresence>
        {showAddPlan && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md glass-morphism p-8 rounded-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create Study Plan</h2>
                <button onClick={() => setShowAddPlan(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleCreatePlan} className="space-y-4">
                <input
                  placeholder="Subject (e.g. Physics)"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  value={newPlan.subject}
                  onChange={(e) => setNewPlan({ ...newPlan, subject: e.target.value })}
                  required
                />
                <input
                  placeholder="Topic (e.g. Quantum Mechanics)"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  value={newPlan.topic}
                  onChange={(e) => setNewPlan({ ...newPlan, topic: e.target.value })}
                  required
                />
                <input
                  type="date"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  value={newPlan.deadline}
                  onChange={(e) => setNewPlan({ ...newPlan, deadline: e.target.value })}
                  required
                />
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setShowAddPlan(false)} className="flex-1 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors text-slate-300">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 gradient-bg py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Create Plan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Add Habit Modal ── */}
      <AnimatePresence>
        {showAddHabit && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md glass-morphism p-8 rounded-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">New Habit</h2>
                <button onClick={() => setShowAddHabit(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleCreateHabit} className="space-y-4">
                <input
                  placeholder="Habit name (e.g. Read for 30 mins)"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  required
                />
                <select
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  value={newHabit.frequency}
                  onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="weekdays">Weekdays</option>
                </select>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setShowAddHabit(false)} className="flex-1 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors text-slate-300">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 gradient-bg py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Start Habit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
