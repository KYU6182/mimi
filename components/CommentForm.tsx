"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { createSupportComment, type ActionState } from "@/lib/actions";

const initialState: ActionState = {};

export default function CommentForm({
  modelProfileId,
  path
}: {
  modelProfileId: string;
  path: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createSupportComment, initialState);
  useEffect(() => {
    if (state.redirectTo) router.push(state.redirectTo);
  }, [router, state.redirectTo]);

  return (
    <form action={formAction} className="rounded-[22px] border border-line bg-paper p-3">
      <input type="hidden" name="modelProfileId" value={modelProfileId} />
      <input type="hidden" name="path" value={path} />
      <p className="mb-2 text-xs font-black text-rose">応援コメントを書く</p>
      <textarea
        name="body"
        maxLength={100}
        placeholder="応援メッセージを送る♡"
        className="min-h-20 w-full resize-none rounded-2xl border border-line bg-ivory px-3 py-3 text-sm outline-none placeholder:text-muted/70"
      />
      <button
        disabled={pending}
        className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-rose text-xs font-black text-white"
      >
        <Send size={15} />
        送信する
      </button>
      {state.message ? (
        <p className={`mt-2 text-center text-xs font-bold ${state.ok ? "text-rose" : "text-muted"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
