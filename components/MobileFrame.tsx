export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-ivory shadow-[0_0_55px_rgba(96,72,74,0.12)] md:my-6 md:min-h-[calc(100vh-48px)] md:rounded-[34px] md:border md:border-line">
      {children}
    </main>
  );
}
