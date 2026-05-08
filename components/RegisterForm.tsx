"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { Heart, MessageCircleHeart, Star, Trophy, UserRound } from "lucide-react";
import { registerUserAction, type ActionState } from "@/lib/actions";

const initialState: ActionState = {};
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

const benefits = [
  { icon: Star, text: "mimi girlsを推し登録できる" },
  { icon: Heart, text: "1日1回応援できる" },
  { icon: MessageCircleHeart, text: "応援コメントを送れる" },
  { icon: Trophy, text: "ランキングを見守れる" }
];

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUserAction, initialState);

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h1 className="font-logo text-[38px] leading-tight text-ink">mimiに登録する</h1>
        <p className="mt-2 text-sm font-bold leading-6 text-muted">
          気になるmimi girlを見つけて、
          <br />
          1日1回応援しよう。
        </p>
      </div>

      <div className="mimi-card rounded-[28px] p-4">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-mist text-rose">
            <UserRound size={18} />
          </span>
          <div>
            <p className="text-sm font-black text-ink">登録するとできること</p>
            <div className="mt-3 grid gap-2">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 rounded-2xl bg-ivory/80 px-3 py-2">
                  <Icon size={15} className="shrink-0 text-rose" />
                  <p className="text-xs font-bold text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form action={formAction} className="mimi-card space-y-4 rounded-[30px] p-4 min-[390px]:p-5">
        <Field label="ニックネーム">
          <input name="nickname" placeholder="例：みみ" className={inputClass} />
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
          {pending ? "登録中..." : "ユーザー登録する"}
        </button>

        <div className="space-y-2 pt-1 text-center text-xs font-bold text-muted">
          <p>
            すでにアカウントをお持ちの方は{" "}
            <Link href="/login" className="font-black text-rose">
              ログイン
            </Link>
          </p>
          <p>
            mimi girlsとして参加したい方は{" "}
            <Link href="/entry" className="font-black text-rose">
              エントリーへ
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
