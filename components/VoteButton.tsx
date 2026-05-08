"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { voteForGirl } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default function VoteButton({
  modelProfileId,
  initialVoted,
  isSelf,
  isLoggedIn = true,
  path,
  compact = false
}: {
  modelProfileId: string;
  initialVoted: boolean;
  isSelf: boolean;
  isLoggedIn?: boolean;
  path: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [voted, setVoted] = useState(initialVoted);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const disabled = voted || isSelf || isPending;
  const label = isSelf
    ? "自分には投票できません"
    : voted
      ? "本日は応援済み"
      : isLoggedIn
        ? "応援する"
        : "ログインして応援する";

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => {
          startTransition(async () => {
            const result = await voteForGirl(modelProfileId, path);
            if (result.redirectTo) {
              router.push(result.redirectTo);
              return;
            }
            setMessage(result.message || "");
            if (result.ok) {
              setVoted(true);
              router.refresh();
            }
          });
        }}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-black transition",
          disabled ? "bg-greige/30 text-muted" : "bg-rose text-white shadow-soft",
          compact && "h-10 text-xs"
        )}
      >
        <Heart size={17} fill={disabled ? "none" : "currentColor"} />
        {label}
      </button>
      {message ? (
        <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-paper px-4 py-2 text-xs font-black text-rose shadow-card">
          {message}
        </div>
      ) : null}
    </div>
  );
}
