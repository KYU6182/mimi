"use client";

import { useActionState } from "react";
import {
  createArticleAction,
  createMagazineIssueAction,
  createWorkAction,
  type ActionState
} from "@/lib/actions";

const initialState: ActionState = {};

function Message({ state }: { state: ActionState }) {
  return state.message ? <p className="text-center text-xs font-bold text-rose">{state.message}</p> : null;
}

export function AdminWorkForm() {
  const [state, formAction, pending] = useActionState(createWorkAction, initialState);
  return (
    <form action={formAction} className="mimi-card space-y-2 rounded-[22px] p-4">
      <p className="text-sm font-black text-ink">PR案件作成</p>
      <input name="title" placeholder="案件タイトル" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <select name="category" className="h-10 w-full rounded-2xl border border-line px-3 text-sm">
        <option value="CAFE">カフェ</option>
        <option value="SALON">サロン</option>
        <option value="NAIL">ネイル</option>
        <option value="APPAREL">アパレル</option>
        <option value="COSMETIC">コスメ</option>
        <option value="MODEL">モデル</option>
        <option value="OTHER">その他</option>
      </select>
      <input name="region" placeholder="地域" defaultValue="福岡" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <input name="imageUrl" placeholder="/images/works/cafe.png" defaultValue="/images/works/cafe.png" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <input name="deadline" type="date" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <textarea name="description" placeholder="説明" className="min-h-20 w-full rounded-2xl border border-line px-3 py-2 text-sm" />
      <button disabled={pending} className="h-10 w-full rounded-full bg-rose text-xs font-black text-white">作成</button>
      <Message state={state} />
    </form>
  );
}

export function AdminIssueForm() {
  const [state, formAction, pending] = useActionState(createMagazineIssueAction, initialState);
  return (
    <form action={formAction} className="mimi-card space-y-2 rounded-[22px] p-4">
      <p className="text-sm font-black text-ink">雑誌号作成</p>
      <input name="title" placeholder="mimi vol.13" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <input name="coverImageUrl" defaultValue="/images/magazine/vol12.png" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <textarea name="description" placeholder="説明" className="min-h-20 w-full rounded-2xl border border-line px-3 py-2 text-sm" />
      <button disabled={pending} className="h-10 w-full rounded-full bg-rose text-xs font-black text-white">作成</button>
      <Message state={state} />
    </form>
  );
}

export function AdminArticleForm({ issueId }: { issueId?: string }) {
  const [state, formAction, pending] = useActionState(createArticleAction, initialState);
  return (
    <form action={formAction} className="mimi-card space-y-2 rounded-[22px] p-4">
      <p className="text-sm font-black text-ink">記事作成</p>
      <input name="issueId" defaultValue={issueId} placeholder="issue id" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <input name="title" placeholder="記事タイトル" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <input name="category" placeholder="編集部ピック" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <input name="thumbnailUrl" defaultValue="/images/girls/sakura.png" className="h-10 w-full rounded-2xl border border-line px-3 text-sm" />
      <textarea name="body" placeholder="本文" className="min-h-20 w-full rounded-2xl border border-line px-3 py-2 text-sm" />
      <button disabled={pending} className="h-10 w-full rounded-full bg-rose text-xs font-black text-white">作成</button>
      <Message state={state} />
    </form>
  );
}
