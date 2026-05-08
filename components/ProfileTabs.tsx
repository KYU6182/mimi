const tabs = ["プロフィール", "ストーリー", "応援コメント", "成長記録"];

export default function ProfileTabs() {
  return (
    <nav className="mimi-scrollbar flex gap-5 overflow-x-auto border-b border-line px-1">
      {tabs.map((tab, index) => (
        <a
          key={tab}
          href={`#${index === 0 ? "profile" : index === 1 ? "story" : index === 2 ? "comments" : "growth"}`}
          className={[
            "shrink-0 border-b-2 pb-2 text-xs font-black transition",
            index === 0 ? "border-rose text-rose" : "border-transparent text-muted"
          ].join(" ")}
        >
          {tab}
        </a>
      ))}
    </nav>
  );
}
