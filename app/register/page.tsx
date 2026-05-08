import { Suspense } from "react";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "ユーザー登録 | mimi",
  description: "mimi girlsを応援したり、推し登録したりするためのユーザー登録ページです。"
};

export default async function RegisterPage({
  searchParams
}: {
  searchParams: Promise<{ type?: string; role?: string }>;
}) {
  const params = await searchParams;
  const requestedType = (params.type || params.role || "").toLowerCase();
  if (requestedType === "model") redirect("/entry");

  return (
    <AppShell>
      <Header title="mimiに登録する" centered />
      <div className="px-4 py-5">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </AppShell>
  );
}
