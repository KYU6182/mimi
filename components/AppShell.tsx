import BottomNav from "@/components/BottomNav";
import MobileFrame from "@/components/MobileFrame";
import { getCurrentUser } from "@/lib/auth";

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <MobileFrame>
      <div className="min-h-screen bg-ivory pb-[calc(116px+env(safe-area-inset-bottom))] md:min-h-[calc(100vh-48px)]">
        {children}
        <BottomNav isLoggedIn={Boolean(user)} />
      </div>
    </MobileFrame>
  );
}
