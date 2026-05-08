import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import LineCta from "@/components/LineCta";
import FinalEntryCta from "@/components/FinalEntryCta";

export const metadata = {
  title: "LINE連携・推し活 | mimi",
  description: "推し通知、表紙候補速報、最新号、地域募集のお知らせをLINEで受け取れます。"
};

export default function LinePage() {
  return (
    <AppShell>
      <Header title="LINE連携" centered />
      <div className="space-y-6 px-4 py-6">
        <LineCta />
        <FinalEntryCta />
      </div>
    </AppShell>
  );
}
