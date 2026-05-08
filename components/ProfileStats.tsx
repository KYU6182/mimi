export default function ProfileStats({
  votes,
  favorites,
  works = 3
}: {
  votes: number;
  favorites: number;
  works?: number;
}) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-[18px] border border-line bg-paper shadow-[0_8px_18px_rgba(96,72,74,0.05)]">
      <div className="p-3 text-center">
        <p className="text-[19px] font-black tabular-nums text-ink">{votes.toLocaleString()}</p>
        <p className="mt-0.5 text-[10px] font-bold text-muted">総獲得票数</p>
      </div>
      <div className="border-x border-line p-3 text-center">
        <p className="text-[19px] font-black tabular-nums text-ink">{favorites.toLocaleString()}</p>
        <p className="mt-0.5 text-[10px] font-bold text-muted">応援してる人</p>
      </div>
      <div className="p-3 text-center">
        <p className="text-[19px] font-black tabular-nums text-ink">{works}</p>
        <p className="mt-0.5 text-[10px] font-bold text-muted">掲載実績</p>
      </div>
    </div>
  );
}
