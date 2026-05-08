"use client";

import { useActionState } from "react";
import type { ModelProfile } from "@prisma/client";
import { updateMyModelProfile, type ActionState } from "@/lib/actions";
import { splitTags } from "@/lib/utils";

const initialState: ActionState = {};
const inputClass =
  "mt-1 h-11 w-full rounded-2xl border border-line bg-paper px-3 text-sm font-bold text-ink outline-none transition placeholder:text-muted/60 focus:border-rose focus:ring-4 focus:ring-rose-mist";
const textareaClass =
  "mt-1 min-h-24 w-full resize-none rounded-2xl border border-line bg-paper px-3 py-3 text-sm font-bold leading-6 text-ink outline-none transition placeholder:text-muted/60 focus:border-rose focus:ring-4 focus:ring-rose-mist";

export default function ProfileEditForm({ profile }: { profile: ModelProfile }) {
  const [state, formAction, pending] = useActionState(updateMyModelProfile, initialState);
  const styleTags = splitTags(profile.styleTags).join(", ");
  const interestTags = splitTags(profile.interestTags).join(", ");

  return (
    <form action={formAction} className="mimi-card space-y-4 rounded-[26px] p-4">
      <div>
        <p className="font-logo text-2xl text-ink">profile edit</p>
        <p className="mt-1 text-xs font-bold leading-5 text-muted">
          公開状態とURLは編集部が管理します。ここではプロフィール内容だけ更新できます。
        </p>
      </div>

      <label className="block text-xs font-black text-muted">
        表示名
        <input name="displayName" defaultValue={profile.displayName} className={inputClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        地域
        <input name="region" defaultValue={profile.region} className={inputClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        Instagram ID
        <input name="instagram" defaultValue={profile.instagram ?? ""} placeholder="例：yuina__gram" className={inputClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        系統タグ
        <input name="styleTags" defaultValue={styleTags} placeholder="淡色, カフェ, 韓国" className={inputClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        好きなもの
        <input name="interestTags" defaultValue={interestTags} placeholder="カフェ巡り, メイク, 写真" className={inputClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        自己紹介
        <textarea name="bio" defaultValue={profile.bio} className={textareaClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        mimiを始めた理由
        <textarea name="reason" defaultValue={profile.reason} className={textareaClass} />
      </label>

      <label className="block text-xs font-black text-muted">
        今月の目標
        <textarea name="goal" defaultValue={profile.goal} className="mt-1 min-h-20 w-full resize-none rounded-2xl border border-line bg-paper px-3 py-3 text-sm font-bold leading-6 text-ink outline-none transition placeholder:text-muted/60 focus:border-rose focus:ring-4 focus:ring-rose-mist" />
      </label>

      <button disabled={pending} className="h-11 w-full rounded-full bg-rose text-sm font-black text-white shadow-soft disabled:opacity-60">
        {pending ? "保存中..." : "プロフィールを保存する"}
      </button>
      {state.message ? (
        <p className="rounded-2xl bg-rose-mist px-3 py-2 text-center text-xs font-black text-rose">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
