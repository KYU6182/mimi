"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { Camera, Heart, Sparkles } from "lucide-react";
import { entryModelAction, type ActionState } from "@/lib/actions";

const initialState: ActionState = {};
const styleTags = ["韓国", "淡色", "カフェ", "ガーリー", "美容", "サロンモデル", "アパレル", "コスメ", "ナチュラル", "透明感"];
const regions = ["東京", "大阪", "名古屋", "福岡", "北海道", "仙台", "広島", "その他"];

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-xs font-black text-muted">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-4 text-sm font-bold text-ink outline-none transition placeholder:text-muted/60 focus:border-rose focus:ring-4 focus:ring-rose-mist";

export default function EntryForm() {
  const [state, formAction, pending] = useActionState(entryModelAction, initialState);

  return (
    <section className="space-y-4">
      <div className="text-center">
        <p className="text-xs font-black tracking-[0.22em] text-rose">mimi girls entry</p>
        <h1 className="mt-1 font-logo text-[38px] leading-tight text-ink">mimi girls エントリー</h1>
        <p className="mt-2 text-sm font-bold leading-6 text-muted">
          フォロワーが多くなくても、モデル経験がなくても大丈夫。
          <br />
          あなたの“好き”を、mimiで見つけてもらおう。
        </p>
      </div>

      <div className="mimi-card rounded-[28px] p-4">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-mist text-rose">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-sm font-black text-ink">エントリー後は確認中になります</p>
            <p className="mt-1 text-xs font-bold leading-5 text-muted">
              管理者確認後に公開されると、mimi girls一覧とランキングに表示されます。
            </p>
          </div>
        </div>
      </div>

      <form action={formAction} className="mimi-card space-y-4 rounded-[30px] p-4 min-[390px]:p-5">
        <Field label="表示名">
          <input name="displayName" placeholder="例：ゆいな" className={inputClass} />
        </Field>

        <Field label="メールアドレス">
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </Field>

        <Field label="パスワード">
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="8文字以上"
            className={inputClass}
          />
        </Field>

        <Field label="地域">
          <select name="region" defaultValue="福岡" className={inputClass}>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Instagram ID">
          <input name="instagram" placeholder="例：yuina__gram" className={inputClass} />
        </Field>

        <div>
          <p className="mb-2 text-xs font-black text-muted">系統タグ</p>
          <div className="flex flex-wrap gap-2">
            {styleTags.map((tag) => (
              <label key={tag} className="cursor-pointer">
                <input type="checkbox" name="styleTags" value={tag} className="peer sr-only" />
                <span className="inline-flex h-9 items-center rounded-full border border-line bg-paper px-3 text-[11px] font-black text-muted transition peer-checked:border-rose peer-checked:bg-rose peer-checked:text-white">
                  {tag}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Field label="mimiを始めた理由">
          <textarea
            name="reason"
            placeholder="mimiに参加したい理由や、これから挑戦したいことを書いてください。"
            className="mt-1 min-h-28 w-full resize-none rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-bold leading-6 text-ink outline-none transition placeholder:text-muted/60 focus:border-rose focus:ring-4 focus:ring-rose-mist"
          />
        </Field>

        <label className="flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-paper px-3 text-xs font-bold leading-5 text-muted">
          <input name="over18" type="checkbox" className="size-4 shrink-0 accent-rose" />
          私は18歳以上です
        </label>

        <label className="flex min-h-11 items-start gap-3 rounded-2xl border border-line bg-paper px-3 py-3 text-xs font-bold leading-5 text-muted">
          <input name="terms" type="checkbox" className="mt-0.5 size-4 shrink-0 accent-rose" />
          <span>利用規約とプライバシーポリシーに同意します</span>
        </label>

        {state.message ? (
          <p className="rounded-2xl bg-rose-mist px-3 py-2 text-center text-xs font-black text-rose">
            {state.message}
          </p>
        ) : null}

        <button
          disabled={pending}
          className="h-12 w-full rounded-full bg-rose px-4 text-sm font-black text-white shadow-soft transition hover:brightness-105 disabled:opacity-60"
        >
          {pending ? "エントリー中..." : "mimi girlsにエントリーする"}
        </button>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href="/register"
            className="flex min-h-10 items-center justify-center gap-1 rounded-full border border-line bg-paper px-3 text-center text-[11px] font-black text-muted"
          >
            <Heart size={13} />
            ユーザー登録
          </Link>
          <Link
            href="/login"
            className="flex min-h-10 items-center justify-center gap-1 rounded-full border border-line bg-paper px-3 text-center text-[11px] font-black text-muted"
          >
            <Camera size={13} />
            ログイン
          </Link>
        </div>
      </form>
    </section>
  );
}
