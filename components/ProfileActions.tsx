import Link from "next/link";
import { MessageCircle } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import VoteButton from "@/components/VoteButton";
import { lineUrl } from "@/lib/utils";

export default function ProfileActions({
  modelProfileId,
  initialVoted,
  initialFavorite,
  initialFavoriteCount,
  isSelf,
  isLoggedIn,
  path
}: {
  modelProfileId: string;
  initialVoted: boolean;
  initialFavorite: boolean;
  initialFavoriteCount?: number;
  isSelf: boolean;
  isLoggedIn: boolean;
  path: string;
}) {
  return (
    <section className="grid gap-2">
      <VoteButton
        modelProfileId={modelProfileId}
        initialVoted={initialVoted}
        isSelf={isSelf}
        isLoggedIn={isLoggedIn}
        path={path}
      />
      <div className="grid grid-cols-2 gap-2">
        <FavoriteButton
          modelProfileId={modelProfileId}
          initialFavorite={initialFavorite}
          initialFavoriteCount={initialFavoriteCount}
          isLoggedIn={isLoggedIn}
          path={path}
          compact
        />
        <Link
          href={lineUrl || "/line"}
          className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-linegreen bg-paper text-xs font-black text-linegreen"
        >
          <MessageCircle size={15} />
          LINEで推し登録
        </Link>
      </div>
    </section>
  );
}
