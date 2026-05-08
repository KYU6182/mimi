"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, Send } from "lucide-react";
import { applyToWorkAction } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default function WorkApplicationButton({
  workOpportunityId,
  initialApplied,
  compact = false
}: {
  workOpportunityId: string;
  initialApplied: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [applied, setApplied] = useState(initialApplied);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={applied || isPending}
        onClick={() => {
          startTransition(async () => {
            const result = await applyToWorkAction(workOpportunityId);
            if (result.redirectTo) {
              router.push(result.redirectTo);
              return;
            }
            setMessage(result.message || "");
            if (result.ok) {
              setApplied(true);
              router.refresh();
            }
          });
        }}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-xs font-black transition",
          applied
            ? "border border-line bg-rose-mist text-rose"
            : "bg-rose text-white shadow-soft hover:bg-[#cf677c]",
          isPending && "opacity-70",
          compact && "h-9 px-3 text-[11px]"
        )}
      >
        {applied ? <Check size={15} /> : <Send size={15} />}
        {isPending ? "応募中..." : applied ? "応募済み" : "応募する"}
      </button>
      {message ? <p className="text-center text-[11px] font-bold leading-5 text-rose">{message}</p> : null}
    </div>
  );
}
