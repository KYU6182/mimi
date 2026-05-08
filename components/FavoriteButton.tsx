"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleFavoriteAction } from "@/lib/actions";

export default function FavoriteButton({
  modelProfileId,
  initialFavorite,
  initialFavoriteCount,
  isLoggedIn = true,
  compact = false,
  path
}: {
  modelProfileId: string;
  initialFavorite: boolean;
  initialFavoriteCount?: number;
  isLoggedIn?: boolean;
  compact?: boolean;
  path: string;
}) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(initialFavorite);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const label = isPending
    ? "更新中..."
    : favorite
      ? "推し登録済み"
      : isLoggedIn
        ? "推し登録"
        : "ログインして推し登録";

  return (
    <div>
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const result = await toggleFavoriteAction(modelProfileId, path);
            if (result.redirectTo) {
              router.push(result.redirectTo);
              return;
            }
            if (result.ok) {
              setFavorite(Boolean(result.isFavorite));
              if (typeof result.favoriteCount === "number") {
                setFavoriteCount(result.favoriteCount);
              }
            }
            setMessage(result.message || "");
            router.refresh();
          });
        }}
        className={[
          "flex w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-4 font-black text-rose",
          compact ? "h-10 text-[11px]" : "h-12 text-sm"
        ].join(" ")}
      >
        <Star size={compact ? 14 : 17} fill={favorite ? "currentColor" : "none"} />
        {label}
        {typeof favoriteCount === "number" && !compact ? (
          <span className="rounded-full bg-rose-mist px-2 py-0.5 text-[11px] text-rose">
            {favoriteCount.toLocaleString()}
          </span>
        ) : null}
      </button>
      {message ? <p className="mt-2 text-center text-xs font-bold text-rose">{message}</p> : null}
    </div>
  );
}
