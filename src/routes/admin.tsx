import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Kathe Gaararu" },
      { name: "description", content: "Secure admin dashboard for content management." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-24 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-center p-10 rounded-3xl bg-card border border-gold/30 shadow-glow"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold flex items-center justify-center shadow-glow">
            <Lock className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display mb-4 text-gradient-gold">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The secure admin panel — including login, class & schedule management, gallery uploads, and content editing — is ready to be wired up to <span className="text-primary">Lovable Cloud</span> in the next iteration.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-primary">
            <Sparkles className="w-4 h-4" /> Coming next: backend + auth
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
