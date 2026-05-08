"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAction, type ActionState } from "@/lib/actions";

const initialState: ActionState = {};
const inputClass =
  "mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-4 text-sm font-bold text-ink outline-none transition placeholder:text-muted/60 focus:border-rose focus:ring-4 focus:ring-rose-mist";

export default function LoginForm({ next = "/mypage" }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  return (
    <form action={formAction} className="mimi-card space-y-4 rounded-[28px] p-5">
      <input type="hidden" name="next" value={next} />
      <div className="rounded-[22px] border border-line bg-ivory/70 p-3">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-mist text-rose">
            <LogIn size={18} />
          </span>
          <div>
            <p className="text-sm font-black text-ink">ログイン</p>
            <p className="mt-1 text-xs font-bold leading-5 text-muted">
              投票・推し登録・応援コメントはログインすると使えます。
            </p>
          </div>
        </div>
      </div>
      <label className="block text-xs font-black text-muted">
        メールアドレス
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>
      <label className="block text-xs font-black text-muted">
        パスワード
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="パスワード"
          className={inputClass}
        />
      </label>
      {state.message ? (
        <p className="rounded-2xl bg-rose-mist px-3 py-2 text-center text-xs font-black text-rose">
          {state.message}
        </p>
      ) : null}
      <button disabled={pending} className="h-12 w-full rounded-full bg-rose text-sm font-black text-white shadow-soft">
        {pending ? "ログイン中..." : "ログイン"}
      </button>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Link
          href="/register"
          className="rounded-full border border-line bg-paper px-3 py-2 text-center text-[11px] font-black text-muted"
        >
          ユーザー登録
        </Link>
        <Link
          href="/entry"
          className="rounded-full border border-line bg-paper px-3 py-2 text-center text-[11px] font-black text-muted"
        >
          mimi girlsエントリー
        </Link>
      </div>
    </form>
  );
}
