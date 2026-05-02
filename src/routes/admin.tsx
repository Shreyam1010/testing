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
import { EventsEditor } from "@/components/admin/EventsEditor";
import { ClassesEditor } from "@/components/admin/ClassesEditor";
import { ContactEditor } from "@/components/admin/ContactEditor";
import { GalleryEditor } from "@/components/admin/GalleryEditor";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_auth") === "true";
  });
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Try admin/admin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
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

  return <Dashboard onLogout={handleLogout} />;
}

type Tab = "hero" | "about" | "events" | "classes" | "gallery" | "blog" | "contact";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [view, setView] = useState<"preview" | "edit">("preview");
  const [editLang, setEditLang] = useState<"en" | "kn">("en");

  const navItems = [
    { id: "hero", label: "Hero", icon: ImageIcon },
    { id: "about", label: "About", icon: Info },
    { id: "events", label: "Events", icon: Calendar },
    { id: "classes", label: "Classes", icon: BookOpen },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "blog", label: "Insights", icon: Edit3 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="h-20 border-b border-border bg-card/50 backdrop-blur-xl flex items-center px-4 xl:px-8 sticky top-0 z-50 w-full gap-2 xl:gap-4">
        {/* LEFT LOGO */}
        <div className="flex items-center gap-3 pr-2 xl:pr-4 border-r border-border shrink-0">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center font-display font-bold text-background text-sm">ಯ</div>
          <span className="text-primary font-display text-sm tracking-widest uppercase hidden md:block whitespace-nowrap">Kathe Gaararu</span>
        </div>
        
        {/* MIDDLE NAV */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === item.id 
                    ? "bg-gold/10 text-gold" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2 xl:gap-4 shrink-0">
          {/* Language Toggle */}
          <div className="flex bg-background/50 border border-border rounded-full p-1 shrink-0">
            <button
              onClick={() => setEditLang("en")}
              className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                editLang === "en" ? "bg-blue-500 text-white" : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setEditLang("kn")}
              className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                editLang === "kn" ? "bg-gold text-background" : "text-muted-foreground"
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          <div className="h-6 w-px bg-border shrink-0 hidden sm:block" />

          {/* View Toggle */}
          <div className="flex bg-background/50 border border-border rounded-lg p-1 shrink-0">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 px-2 xl:px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${
                view === "preview" ? "bg-white/10 text-white" : "text-muted-foreground"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              onClick={() => setView("edit")}
              className={`flex items-center gap-1.5 px-2 xl:px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${
                view === "edit" ? "bg-gold text-background" : "text-muted-foreground"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>

          {view === "edit" && (
            <button 
              onClick={() => {
                alert("Changes saved successfully! (Simulated)");
                setView("preview");
              }}
              className="flex items-center gap-1.5 px-3 xl:px-4 py-2 bg-primary text-background rounded-lg font-bold shadow-glow hover:scale-105 transition-all text-[9px] uppercase tracking-widest shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
          )}

          <div className="h-6 w-px bg-border shrink-0" />

          <div className="flex items-center gap-1 shrink-0">
            <Link to="/" className="p-2 text-muted-foreground hover:text-gold transition-colors" title="Back to Site">
              <ArrowLeft className="w-4 h-4 xl:w-5 xl:h-5" />
            </Link>
            <button onClick={onLogout} className="p-2 text-muted-foreground hover:text-red-500 transition-colors" title="Logout">
              <LogOut className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>
          </div>
        </div>
      </header>

        {/* Main Canvas Area */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + view + editLang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              <LiveContainer
                section={activeTab}
                isEditing={view === "edit"}
                lang={editLang}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function LiveContainer({ section, isEditing, lang }: { section: Tab; isEditing: boolean; lang: "en" | "kn" }) {
  switch (section) {
    case "hero": return <HeroEditor isEditing={isEditing} lang={lang} />;
    case "about": return <AboutEditor isEditing={isEditing} lang={lang} />;
    case "events": return <EventsEditor isEditing={isEditing} lang={lang} />;
    case "classes": return <ClassesEditor isEditing={isEditing} lang={lang} />;
    case "gallery": return <GalleryEditor isEditing={isEditing} lang={lang} />;
    case "contact": return <ContactEditor isEditing={isEditing} lang={lang} />;
    case "blog": return <BlogEditor isEditing={isEditing} lang={lang} />;
    default:
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-20 text-center">
          <Sparkles className="w-16 h-16 text-gold/20 mb-8" />
          <h3 className="text-3xl font-display text-primary mb-4">{section} Canvas</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            The {section} interactive editor is being optimized for real-time visual updates.
          </p>
        </div>
      );
  }
}
