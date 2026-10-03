import { Mic, Camera, MessageSquare } from "lucide-react";
import { AudelDemo } from "@/components/ui/AudelDemo";
import { IconChip } from "@/components/ui/IconChip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LedgerRow } from "@/components/ui/Ledger";

/**
 * The copilot. In the app it is not a fifth tab — it sits in the centre of the
 * navigation bar, reachable from every screen. The panel plays one real turn:
 * a held button, a transcript, and the budgets that came back.
 */
export function CopilotFeature() {
  return (
    <section id="copilot" className="sheet scroll-mt-20 border-b border-rule py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <SectionHeading
            name="Ask Audel"
            title="Hold the button. Say the thing."
            intro="Audel is not a fifth tab — it sits in the middle of the navigation bar, reachable from every screen. A question can cross your budgets, your goals, and your calendar in one sentence, and what comes back is the work, already done."
          />

          <div className="mt-10 max-w-[30rem]">
            <LedgerRow
              name="Hold to speak"
              meta="The transcript appears as you talk, so a mishear is visible before it is sent."
              leading={<IconChip icon={Mic} size="md" />}
            />
            <LedgerRow
              name="Hold, then slide to the camera"
              meta="A receipt, a menu, a whiteboard. The photo goes with the question."
              leading={<IconChip icon={Camera} size="md" />}
            />
            <LedgerRow
              name="Or open the thread and type"
              meta="Same conversation either way — the quick answer and the full chat are one transcript."
              leading={<IconChip icon={MessageSquare} size="md" />}
              showsDivider={false}
            />
          </div>
        </div>

        <AudelDemo />
      </div>
    </section>
  );
}
