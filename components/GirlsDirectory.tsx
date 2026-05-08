"use client";

import { RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import GirlCard from "@/components/GirlCard";
import GirlsSearchBar from "@/components/GirlsSearchBar";
import type { GirlCardData } from "@/lib/data";
import { cn, splitTags } from "@/lib/utils";

const regions = ["東京", "大阪", "名古屋", "福岡"];
const styleTags = ["韓国", "淡色", "カフェ", "ガーリー", "美容", "サロンモデル", "アパレル", "コスメ"];

type SortKey = "popular" | "new";

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function chipClass(active: boolean) {
  return cn(
    "h-9 shrink-0 rounded-full border px-4 text-xs font-black transition",
    active ? "border-rose bg-rose text-white shadow-soft" : "border-line bg-paper text-muted"
  );
}

function mainChipClass(active: boolean) {
  return cn(
    "flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border px-5 text-xs font-black transition",
    active ? "border-rose bg-rose text-white shadow-soft" : "border-line bg-paper text-ink"
  );
}

function girlTags(girl: GirlCardData) {
  return [...splitTags(girl.styleTags), ...splitTags(girl.interestTags)];
}

function matchesTag(girl: GirlCardData, tag: string) {
  return girlTags(girl).some((girlTag) => girlTag.includes(tag) || tag.includes(girlTag));
}

export default function GirlsDirectory({ girls }: { girls: GirlCardData[] }) {
  const [query, setQuery] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("popular");

  const filteredGirls = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const result = girls.filter((girl) => {
      const tags = girlTags(girl);
      const searchable = [
        girl.displayName,
        girl.region,
        girl.prefecture,
        ...tags
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const regionMatched = selectedRegions.length === 0 || selectedRegions.includes(girl.region);
      const tagMatched = selectedTags.length === 0 || selectedTags.every((tag) => matchesTag(girl, tag));
      const keywordMatched = keyword.length === 0 || searchable.includes(keyword);
      return regionMatched && tagMatched && keywordMatched;
    });

    return result.sort((a, b) => {
      if (sort === "new") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b._count.votes - a._count.votes || b._count.favorites - a._count.favorites;
    });
  }, [girls, query, selectedRegions, selectedTags, sort]);

  const hasFilters = query || selectedRegions.length > 0 || selectedTags.length > 0 || sort !== "popular";

  function resetFilters() {
    setQuery("");
    setSelectedRegions([]);
    setSelectedTags([]);
    setSort("popular");
  }

  return (
    <div className="space-y-5 px-3.5 py-5 min-[390px]:px-4">
      <section className="px-3 text-center">
        <p className="font-logo text-[28px] leading-tight text-ink">mimi girlsを見つける</p>
        <p className="mt-2 text-xs font-bold leading-5 text-muted">まだ有名じゃない、かわいい子を見つけよう</p>
      </section>

      <section className="space-y-3 rounded-[26px] border border-line bg-paper/95 p-3 shadow-card">
        <GirlsSearchBar value={query} onChange={setQuery} />

        <div className="mimi-scrollbar flex gap-2 overflow-x-auto pb-1">
          <span className={mainChipClass(selectedRegions.length > 0)}>
            地域
            <SlidersHorizontal size={14} />
          </span>
          <span className={mainChipClass(selectedTags.length > 0)}>
            系統
            <Sparkles size={14} />
          </span>
          <button type="button" onClick={() => setSort("popular")} className={mainChipClass(sort === "popular")}>
            人気順
          </button>
          <button type="button" onClick={() => setSort("new")} className={mainChipClass(sort === "new")}>
            新着順
          </button>
        </div>

        <div className="rounded-[20px] border border-line bg-ivory/60 p-2.5">
          <div className="mimi-scrollbar flex gap-2 overflow-x-auto pb-1">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegions((current) => toggleValue(current, region))}
                className={chipClass(selectedRegions.includes(region))}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-line bg-ivory/60 p-2.5">
          <div className="mimi-scrollbar flex gap-2 overflow-x-auto pb-1">
            {styleTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTags((current) => toggleValue(current, tag))}
                className={chipClass(selectedTags.includes(tag))}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between px-1">
        <p className="font-logo text-[20px] text-ink">
          {filteredGirls.length}
          <span className="ml-1 font-body text-sm font-black text-muted">girls</span>
        </p>
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-paper px-3 text-xs font-black text-muted disabled:opacity-45"
          disabled={!hasFilters}
        >
          リセット
          <RotateCcw size={13} />
        </button>
      </div>

      {filteredGirls.length ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredGirls.map((girl, index) => (
            <GirlCard key={girl.id} girl={girl} index={index} />
          ))}
        </div>
      ) : (
        <div className="mimi-card rounded-[26px] p-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-rose-mist text-rose">
            <Sparkles size={22} />
          </div>
          <p className="text-sm font-black text-ink">該当するmimi girlが見つかりませんでした。</p>
          <p className="mt-2 text-xs font-bold leading-6 text-muted">条件を変えて探してみてください。</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 h-10 rounded-full bg-rose px-5 text-xs font-black text-white"
          >
            条件をリセット
          </button>
        </div>
      )}
    </div>
  );
}
