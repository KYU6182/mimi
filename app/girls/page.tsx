import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import GirlsDirectory from "@/components/GirlsDirectory";
import { getGirls } from "@/lib/data";

export const metadata = {
  title: "mimi girlsを見つける | mimi",
  description: "地域・系統タグ・人気順で、まだ有名じゃないかわいいmimi girlsを探せます。"
};

export default async function GirlsPage() {
  const girls = await getGirls({ sort: "popular" });

  return (
    <AppShell>
      <Header />
      <GirlsDirectory girls={girls} />
    </AppShell>
  );
}
