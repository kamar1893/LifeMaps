import { categoryStyles } from "../data/mockData";

type StoryCategory = keyof typeof categoryStyles;

interface CategoryBadgeProps {
  category: StoryCategory;
  size?: "sm" | "md";
  className?: string;
}

export function CategoryBadge({
  category,
  size = "md",
}: CategoryBadgeProps) {
  const style = categoryStyles[category];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        borderRadius: "999px",
        fontWeight: 600,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        padding: size === "sm" ? "4px 10px" : "6px 12px",
        fontSize: size === "sm" ? "12px" : "14px",
        color: style?.color || "#ffffff",
      }}
    >
      <span>{style?.icon}</span>
      {category}
    </span>
  );
}