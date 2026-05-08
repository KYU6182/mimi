import Link from "next/link";

export default function SectionTitle({
  eyebrow,
  title,
  href
}: {
  eyebrow?: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between px-1">
      <div className="min-w-0">
        {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose">{eyebrow}</p> : null}
        <h2 className="font-logo text-[23px] leading-tight text-ink sm:text-[24px]">{title}</h2>
      </div>
      {href ? (
        <Link href={href} className="shrink-0 text-xs font-bold text-rose">
          もっと見る
        </Link>
      ) : null}
    </div>
  );
}
