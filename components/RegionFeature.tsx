import Image from "next/image";
import Link from "next/link";
import type { ShopSpot, WorkOpportunity } from "@prisma/client";
import type { GirlCardData } from "@/lib/data";

export default function RegionFeature({
  region,
  girls,
  spots,
  works
}: {
  region: string;
  girls: GirlCardData[];
  spots: ShopSpot[];
  works?: WorkOpportunity[];
}) {
  const pickup = girls[0];
  return (
    <article className="mimi-card overflow-hidden rounded-[26px] p-4">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-bold text-rose">地域特集</p>
          <h3 className="font-logo text-[25px] text-ink">{region}特集</h3>
        </div>
        <Link href={`/local/${region === "福岡" ? "fukuoka" : region}`} className="text-xs font-bold text-rose">
          地域ページへ
        </Link>
      </div>
      <div className="mb-4 rounded-2xl bg-rose-mist/45 p-3">
        <p className="mb-2 text-xs font-black text-ink">{region}ランキングTOP5</p>
        <div className="grid grid-cols-5 gap-2">
          {girls.slice(0, 5).map((girl) => (
            <Link key={girl.id} href={`/girls/${girl.slug}`} className="text-center">
              <div className="relative mx-auto mb-1 size-12 overflow-hidden rounded-xl bg-paper">
                <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="48px" />
              </div>
              <p className="truncate text-[10px] font-bold text-ink">{girl.displayName}</p>
              <p className="text-[9px] text-muted">{girl._count.votes}票</p>
            </Link>
          ))}
        </div>
      </div>
      {pickup ? (
        <Link href={`/girls/${pickup.slug}`} className="mb-4 flex gap-3 rounded-2xl border border-line bg-paper p-3">
          <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-2xl bg-rose-mist">
            <Image src={pickup.mainImageUrl} alt={pickup.displayName} fill className="object-cover" sizes="82px" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-rose">PICK UP GIRL</p>
            <p className="text-lg font-black text-ink">{pickup.displayName}</p>
            <p className="text-xs leading-5 text-muted">{pickup.bio}</p>
          </div>
        </Link>
      ) : null}
      <div className="grid grid-cols-3 gap-2">
        {spots.slice(0, 3).map((spot) => (
          <div key={spot.id}>
            <div className="relative mb-1 h-[62px] overflow-hidden rounded-xl bg-rose-mist">
              <Image src={spot.imageUrl} alt={spot.name} fill className="object-cover" sizes="100px" />
            </div>
            <p className="truncate text-[10px] font-bold text-ink">{spot.name}</p>
          </div>
        ))}
      </div>
      {works?.length ? (
        <p className="mt-3 rounded-2xl bg-paper px-3 py-2 text-xs font-bold text-muted">
          地域PR案件 {works.length}件を掲載中
        </p>
      ) : null}
      <Link
        href="/entry"
        className="mt-3 flex h-11 items-center justify-center rounded-full bg-rose text-xs font-black text-white"
      >
        {region}でmimi girlsに参加する
      </Link>
    </article>
  );
}
