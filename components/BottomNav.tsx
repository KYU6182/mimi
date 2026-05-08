"use client";

import Link from "next/link";
import { BookOpen, Crown, Home, Search, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/girls", label: "探す", icon: Search },
  { href: "/ranking", label: "ランキング", icon: Crown },
  { href: "/magazine", label: "雑誌", icon: BookOpen },
  { href: "/mypage", label: "マイページ", icon: UserRound }
];

export default function BottomNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-line bg-paper/95 px-2 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_28px_rgba(96,72,74,0.08)] backdrop-blur-xl md:bottom-6 md:rounded-b-[34px]">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href === "/mypage" && !isLoggedIn ? "/login?next=/mypage" : item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[9.5px] font-semibold text-muted min-[390px]:text-[10px]",
                active && "text-rose"
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              <span className="whitespace-nowrap leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
