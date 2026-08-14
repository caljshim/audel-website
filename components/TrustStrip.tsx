import { Landmark, ShieldCheck, Lock, Brain } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: Landmark, label: "Bank-linked with Plaid" },
  { icon: ShieldCheck, label: "Read-only brokerage access" },
  { icon: Lock, label: "Your data stays private" },
  { icon: Brain, label: "Powered by Claude" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-card/40">
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 sm:justify-between">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-muted">
            <Icon className="size-4 text-brand" aria-hidden />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
