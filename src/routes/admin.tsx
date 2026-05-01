import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { 
  Lock, User, LogOut, LayoutDashboard, 
  Image as ImageIcon, Info, Calendar, 
  BookOpen, Camera, Mail, Eye, Edit3, Save, 
  Languages, Sparkles, ArrowLeft 
} from "lucide-react";

import { HeroEditor } from "@/components/admin/HeroEditor";
import { AboutEditor } from "@/components/admin/AboutEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Try admin/admin");
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border border-border p-10 rounded-3xl shadow-2xl backdrop-blur-xl"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-gold w-8 h-8" />
              </div>
              <h1 className="text-3xl font-display text-primary">Admin Access</h1>
              <p className="text-muted-foreground text-sm mt-2">Enter credentials to manage the sanctuary</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-gold/50 transition-all"
                    placeholder="admin"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="password" 
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-gold/50 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

              <button 
                type="submit"
                className="w-full bg-gold text-background py-4 rounded-xl font-bold shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Enter Dashboard
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
}

type Tab = "hero" | "about" | "events" | "classes" | "blog" | "contact";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [view, setView] = useState<"edit" | "preview">("edit");

  const sidebarItems = [
    { id: "hero", label: "Hero Section", icon: ImageIcon },
    { id: "about", label: "Our Story", icon: Info },
    { id: "events", label: "Events", icon: Calendar },
    { id: "classes", label: "Classes", icon: BookOpen },
    { id: "blog", label: "Insights", icon: Edit3 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card/30 backdrop-blur-xl flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-border flex items-center gap-4">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-display font-bold text-background">ಯ</div>
          <div>
            <h2 className="text-primary font-display">Kathe Gaararu</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin Suite</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? "bg-gold text-background shadow-glow" 
                  : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-border space-y-3">
          <Link 
            to="/"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gold/30 text-gold hover:bg-gold/10 transition-all text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border text-red-500 hover:bg-red-500/10 transition-all text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-20 border-b border-border flex items-center justify-between px-10 bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl font-display text-primary capitalize">{activeTab} Management</h2>
          
          <div className="flex bg-card border border-border rounded-full p-1">
            <button
              onClick={() => setView("edit")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                view === "edit" ? "bg-gold text-background shadow-glow" : "text-muted-foreground"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor
            </button>
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                view === "preview" ? "bg-gold text-background shadow-glow" : "text-muted-foreground"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview
            </button>
          </div>
        </header>

        <div className="p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {view === "edit" ? (
                <EditorPanel section={activeTab} />
              ) : (
                <PreviewPanel section={activeTab} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function EditorPanel({ section }: { section: Tab }) {
  switch (section) {
    case "hero": return <HeroEditor />;
    case "about": return <AboutEditor />;
    case "blog": return <BlogEditor />;
    default:
      return (
        <div className="py-20 text-center">
          <Sparkles className="w-12 h-12 text-gold/30 mx-auto mb-6" />
          <h3 className="text-2xl font-display text-primary">Advanced Editor Coming Soon</h3>
          <p className="text-muted-foreground">The {section} management module is currently being optimized.</p>
        </div>
      );
  }
}

function PreviewPanel({ section }: { section: Tab }) {
  return (
    <div className="rounded-3xl border border-border bg-[#050505] overflow-hidden shadow-2xl relative">
      <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20">
        Simulated Device View
      </div>
      <div className="h-[750px] overflow-y-auto custom-scrollbar">
        {/* Placeholder for actual component previews */}
        <div className="min-h-full flex flex-col items-center justify-center p-20 text-center">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8">
            <Eye className="text-gold w-10 h-10" />
          </div>
          <h4 className="font-display text-4xl text-primary mb-4">Rendering {section}...</h4>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            This is where the actual {section} section from the live site will be rendered with your current draft changes.
          </p>
          <div className="mt-12 p-8 border border-border/50 rounded-2xl bg-card/20 backdrop-blur-xl max-w-2xl w-full">
            <div className="w-full h-40 bg-gradient-to-br from-gold/20 to-transparent rounded-xl flex items-center justify-center">
               <span className="text-xs font-bold uppercase tracking-widest text-gold/50">Section Visual Snapshot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
