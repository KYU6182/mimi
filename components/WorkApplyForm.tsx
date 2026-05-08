"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { applyToWork, type ActionState } from "@/lib/actions";

const initialState: ActionState = {};

export default function WorkApplyForm({
  workOpportunityId,
  path
}: {
  workOpportunityId: string;
  path: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(applyToWork, initialState);
  useEffect(() => {
    if (state.redirectTo) router.push(state.redirectTo);
  }, [router, state.redirectTo]);
  return (
    <form action={formAction} className="mimi-card space-y-3 rounded-[24px] p-4">
      <input type="hidden" name="workOpportunityId" value={workOpportunityId} />
      <input type="hidden" name="path" value={path} />
      <label className="block text-xs font-black text-muted">
        応募メッセージ
        <textarea name="message" maxLength={160} className="mt-1 min-h-24 w-full rounded-2xl border border-line bg-paper px-3 py-3 text-sm outline-none" placeholder="案件への意気込みを入力" />
      </label>
      <button disabled={pending} className="h-12 w-full rounded-full bg-rose text-sm font-black text-white">
        応募する
      </button>
      {state.message ? <p className="text-center text-xs font-bold text-rose">{state.message}</p> : null}
    </form>
  );
}
