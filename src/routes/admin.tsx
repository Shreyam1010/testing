import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import {
  Lock, User, LogOut, LayoutDashboard,
  Image as ImageIcon, Info, Calendar,
  BookOpen, Camera, Mail, Eye, Edit3, Save,
  Languages, Sparkles, ArrowLeft, Globe, Menu, X
} from "lucide-react";

import { apiUrl } from "@/lib/api";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { AboutEditor } from "@/components/admin/AboutEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { EventsEditor } from "@/components/admin/EventsEditor";
import { ClassesEditor } from "@/components/admin/ClassesEditor";
import { ContactEditor } from "@/components/admin/ContactEditor";
import { GalleryEditor } from "@/components/admin/GalleryEditor";
import { ServicesEditor } from "@/components/admin/ServicesEditor";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_auth") === "true";
    }
    return false;
  });
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("admin_auth", "true");
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Failed to connect to the authentication server.");
    } finally {
      setIsLoggingIn(false);
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

              {error && <p className="text-destructive text-xs text-center font-medium">{error}</p>}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gold text-background py-4 rounded-xl font-bold shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? "Verifying..." : "Enter Dashboard"}
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

type Tab = "hero" | "about" | "events" | "classes" | "gallery" | "blog" | "contact" | "services";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [view, setView] = useState<"preview" | "edit">("preview");
  const [editLang, setEditLang] = useState<"en" | "kn">("en");

  const navItems = [
    { id: "hero", label: "Hero", icon: ImageIcon },
    { id: "about", label: "About", icon: Info },
    { id: "events", label: "Events", icon: Calendar },
    { id: "classes", label: "Classes", icon: BookOpen },
    { id: "services", label: "Performances", icon: Globe },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "blog", label: "Insights", icon: Edit3 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeNavItem = navItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* TOP HEADER */}
        <header className="h-16 md:h-20 border-b border-border bg-card/50 backdrop-blur-xl flex items-center px-4 md:px-8 fixed top-0 left-0 right-0 z-[60] justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gold rounded-xl flex items-center justify-center font-display font-bold text-background text-sm shadow-glow group-hover:scale-110 transition-transform">ಯ</div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-0.5">Admin</span>
                <span className="text-xs font-display text-primary tracking-widest uppercase hidden sm:block">Kathe Gaararu</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 bg-background/50 p-1 rounded-xl border border-border/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === item.id 
                    ? "bg-gold text-background shadow-glow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span className="font-display">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Controls Container */}
          <div className="flex items-center gap-2">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-3 pr-3 border-r border-border/50">
              {/* Language */}
              <div className="flex bg-background/50 border border-border rounded-full p-0.5">
                <button onClick={() => setEditLang("en")} className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${editLang === "en" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>EN</button>
                <button onClick={() => setEditLang("kn")} className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${editLang === "kn" ? "bg-gold text-background" : "text-muted-foreground"}`}>KN</button>
              </div>

              {/* View */}
              <div className="flex bg-background/50 border border-border rounded-lg p-0.5">
                <button onClick={() => setView("preview")} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${view === "preview" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
                  <Eye size={12} /> PREVIEW
                </button>
                <button onClick={() => setView("edit")} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${view === "edit" ? "bg-gold text-background" : "text-muted-foreground"}`}>
                  <Edit3 size={12} /> EDIT
                </button>
              </div>
            </div>

            {/* Save Button (Always visible when needed) */}
            {view === "edit" && (
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("admin:save", { detail: { section: activeTab } }));
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-gold text-background rounded-lg font-bold shadow-glow hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest"
              >
                <Save size={14} />
                <span className="hidden sm:inline">Save</span>
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 bg-muted/50 rounded-lg text-gold border border-border"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop Exit */}
            <div className="hidden md:flex items-center gap-1 ml-2">
              <Link to="/" className="p-2 text-muted-foreground hover:text-gold transition-colors"><ArrowLeft size={18} /></Link>
              <button onClick={onLogout} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><LogOut size={18} /></button>
            </div>
          </div>
        </header>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[70] lg:hidden"
              />
              
              {/* Menu Container (Centering Wrapper) */}
              <div className="fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4 pointer-events-none lg:hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="w-full max-w-[320px] bg-background/95 backdrop-blur-2xl border border-border rounded-[2.5rem] p-5 shadow-2xl overflow-y-auto max-h-[80vh] pointer-events-auto"
                >
                  <div className="space-y-6">
                  {/* Section Selector */}
                  <div>
                    <span className="text-[8px] font-bold text-gold/60 uppercase tracking-[0.2em] mb-3 block text-center">Content Sanctuary</span>
                    
                    {/* Grid for all nav items (3 columns) */}
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setActiveTab(item.id as Tab); setIsMobileMenuOpen(false); }}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all gap-1.5 ${
                            activeTab === item.id
                              ? "bg-gold/10 border-gold/50 text-gold shadow-glow"
                              : "bg-muted/40 border-border/50 text-muted-foreground"
                          }`}
                        >
                          <item.icon size={16} />
                          <span className="font-display text-[7px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* hidden after refactor */}
                    <div className="hidden">
                      {[].map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => { setActiveTab(item.id as Tab); setIsMobileMenuOpen(false); }}
                          className={`flex-1 max-w-[32%] flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all gap-1.5 ${
                            activeTab === item.id
                              ? "bg-gold/10 border-gold/50 text-gold shadow-glow"
                              : "bg-muted/40 border-border/50 text-muted-foreground"
                          }`}
                        >
                          <item.icon size={16} />
                          <span className="font-display text-[7px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[8px] font-bold text-gold/60 uppercase tracking-widest block text-center">Language</span>
                      <div className="flex bg-muted/40 border border-border/50 rounded-lg p-0.5">
                        <button onClick={() => setEditLang("en")} className={`flex-1 py-1.5 rounded-md text-[8px] font-bold transition-all ${editLang === "en" ? "bg-accent text-accent-foreground shadow-lg" : "text-muted-foreground"}`}>EN</button>
                        <button onClick={() => setEditLang("kn")} className={`flex-1 py-1.5 rounded-md text-[8px] font-bold transition-all ${editLang === "kn" ? "bg-gold text-background shadow-lg" : "text-muted-foreground"}`}>KN</button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[8px] font-bold text-gold/60 uppercase tracking-widest block text-center">Mode</span>
                      <div className="flex bg-muted/40 border border-border/50 rounded-lg p-0.5">
                        <button onClick={() => setView("preview")} className={`flex-1 flex flex-col items-center py-1 rounded-md transition-all ${view === "preview" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
                          <Eye size={12} /> <span className="text-[7px] font-bold">VIEW</span>
                        </button>
                        <button onClick={() => setView("edit")} className={`flex-1 flex flex-col items-center py-1 rounded-md transition-all ${view === "edit" ? "bg-gold text-background" : "text-muted-foreground"}`}>
                          <Edit3 size={12} /> <span className="text-[7px] font-bold">EDIT</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Account/Exit */}
                  <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                    <Link to="/" className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-muted/40 text-primary font-bold text-[9px] border border-border tracking-widest uppercase">
                      <ArrowLeft size={14} /> Exit Website
                    </Link>
                    <button onClick={onLogout} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-destructive/10 text-destructive font-bold text-[9px] border border-destructive/20 tracking-widest uppercase">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
          )}
        </AnimatePresence>

        {/* Main Canvas Area */}
        <main className="flex-1 overflow-auto custom-scrollbar pt-16 md:pt-20">
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
    case "services": return (
      <div className="p-8 xl:p-12">
        <ServicesEditor isEditing={isEditing} lang={lang} />
      </div>
    );
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
