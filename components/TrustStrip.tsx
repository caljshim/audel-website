import { Landmark, ShieldCheck, Lock, Brain } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: Landmark, label: "Securely bank-linked" },
  { icon: ShieldCheck, label: "Read-only access" },
  { icon: Lock, label: "Your data stays private" },
  { icon: Brain, label: "Private AI copilot" },
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <Reveal className="grid grid-cols-1 gap-4 rounded-card bg-card px-6 py-6 min-[360px]:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-muted sm:text-sm">
            <Icon className="size-4 text-brand" aria-hidden />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
