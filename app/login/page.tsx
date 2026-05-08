import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "ログイン | mimi",
  description: "mimiにログインして、投票・推し登録・応援コメントを楽しめます。"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  return (
    <AppShell>
      <Header title="ログイン" centered />
      <div className="px-4 py-8">
        <div className="mb-6 text-center">
          <p className="font-logo text-5xl text-ink">mimi</p>
          <p className="mt-2 text-sm font-bold text-muted">登録済みのアカウントでログインしてください。</p>
        </div>
        <LoginForm next={params.next ?? "/mypage"} />
      </div>
    </AppShell>
  );
}
