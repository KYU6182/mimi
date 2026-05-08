import Link from "next/link";
import { Crown, MapPin, Sparkles, TrendingUp } from "lucide-react";

const shortcuts = [
  { href: "/ranking?tab=rising", label: "急上昇ランキング", icon: TrendingUp },
  { href: "/ranking?tab=region", label: "地域別ランキング", icon: MapPin },
  { href: "/ranking?tab=new", label: "新人ランキング", icon: Sparkles },
  { href: "/ranking?tab=cover", label: "表紙候補", icon: Crown }
];

export default function RankingShortcut() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {shortcuts.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="mimi-card flex h-[82px] flex-col justify-between rounded-[18px] p-3"
          >
            <Icon size={20} className="text-rose" />
            <span className="text-[12px] font-bold leading-snug text-ink">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
