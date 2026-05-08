import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("メールアドレスを確認してください"),
  password: z.string().min(1, "パスワードを入力してください")
});

export const registerSchema = z.object({
  role: z.enum(["MODEL", "FAN"]),
  email: z.string().trim().min(1, "メールアドレスを入力してください").email("メールアドレスを確認してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
  nickname: z.string().trim().min(1, "名前を入力してください").max(30),
  birthDate: z.string().optional(),
  region: z.string().min(1, "地域を選択してください"),
  instagram: z.string().trim().optional(),
  styleTags: z.string().optional(),
  reason: z.string().trim().optional(),
  terms: z.literal("on", {
    errorMap: () => ({ message: "利用規約への同意が必要です" })
  }),
  over18: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.role === "MODEL") {
    if (!data.reason?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["reason"],
        message: "mimiを始めた理由を入力してください"
      });
    }
    if (!data.styleTags?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["styleTags"],
        message: "系統タグを1つ以上選択してください"
      });
    }
    if (data.over18 !== "on") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["over18"],
        message: "18歳以上の確認が必要です"
      });
    }
  }
});

export const commentSchema = z.object({
  modelProfileId: z.string(),
  body: z.string().min(1, "コメントを入力してください").max(100, "コメントは100文字以内です"),
  path: z.string()
});

export const profileUpdateSchema = z.object({
  displayName: z.string().trim().min(1, "表示名を入力してください").max(30),
  region: z.string().trim().min(1, "地域を入力してください").max(20),
  instagram: z.string().trim().max(80).optional(),
  bio: z.string().trim().max(180, "自己紹介は180文字以内です").optional(),
  reason: z.string().trim().max(240, "mimiを始めた理由は240文字以内です").optional(),
  goal: z.string().trim().max(160, "今月の目標は160文字以内です").optional(),
  styleTags: z.string().trim().max(140, "系統タグが長すぎます").optional(),
  interestTags: z.string().trim().max(140, "好きなものが長すぎます").optional()
});

export const workApplicationSchema = z.object({
  workOpportunityId: z.string(),
  message: z.string().max(160).optional(),
  path: z.string()
});

export const adminWorkSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["CAFE", "SALON", "NAIL", "APPAREL", "COSMETIC", "MODEL", "OTHER"]),
  region: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  deadline: z.string().min(1)
});
