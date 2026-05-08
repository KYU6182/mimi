import AppShell from "@/components/AppShell";
import EntryForm from "@/components/EntryForm";
import Header from "@/components/Header";

export const metadata = {
  title: "mimi girls エントリー | mimi",
  description: "mimi girlsとして掲載を目指す方向けのエントリーページです。"
};

export default function EntryPage() {
  return (
    <AppShell>
      <Header title="mimi girls エントリー" centered />
      <div className="px-4 py-5">
        <EntryForm />
      </div>
    </AppShell>
  );
}
