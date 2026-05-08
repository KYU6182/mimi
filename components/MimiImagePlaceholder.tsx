import { cn } from "@/lib/utils";

export default function MimiImagePlaceholder({
  className,
  label = "mimi girl"
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid overflow-hidden bg-[linear-gradient(135deg,#FCECF0_0%,#FFFDFC_48%,#E9D8CB_100%)]",
        className
      )}
    >
      <div className="absolute -right-6 -top-6 size-20 rounded-full border border-white/70 bg-white/30" />
      <div className="absolute -bottom-8 left-4 size-24 rounded-full border border-rose-soft/50 bg-rose-soft/25" />
      <span className="place-self-center font-logo text-lg text-muted/75">{label}</span>
    </div>
  );
}
