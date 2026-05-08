import { cn } from "@/lib/utils";

export default function TagPill({
  children,
  active = false,
  className
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold leading-none",
        active
          ? "border-rose bg-rose text-white"
          : "border-line bg-rose-mist/65 text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
