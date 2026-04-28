import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, LogOut, ShieldCheck, Calendar, Image as ImageIcon, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Kathe Gaararu" },
      { name: "description", content: "Secure admin dashboard for content management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <Layout>
        <section className="container mx-auto px-6 py-24 min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg text-center p-10 rounded-3xl bg-card border border-destructive/40"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/20 border border-destructive flex items-center justify-center">
              <Lock className="w-7 h-7 text-destructive" />
            </div>
            <h1 className="text-3xl font-display mb-3 text-destructive">Access Denied</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              You're signed in as <span className="text-foreground">{user.email}</span>, but this account does not have admin privileges.
            </p>
            <button
              onClick={async () => {
                await signOut();
                navigate({ to: "/login" });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border hover:border-gold text-sm"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  const cards = [
    { icon: BookOpen, title: "Classes", desc: "Manage course offerings, gurus, and descriptions." },
    { icon: Calendar, title: "Schedule", desc: "Edit the weekly schedule and timings." },
    { icon: ImageIcon, title: "Gallery", desc: "Upload performance photos and manage media." },
  ];

  return (
    <Layout>
      <section className="container mx-auto px-6 py-24 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-2">
              <ShieldCheck className="w-4 h-4" /> Administrator
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-gradient-gold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.email}</p>
          </div>
          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/login" });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-gold text-sm transition"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-gold/60 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-4 group-hover:shadow-glow transition">
                <c.icon className="w-5 h-5 text-gold" />
              </div>
              <h2 className="text-xl font-display mb-2">{c.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <div className="mt-4 text-xs text-muted-foreground">CRUD coming next</div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
