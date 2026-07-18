// ─── Props ───────────────────────────────────────────────────────────────────

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * A server component that wraps markdown content in a styled prose container.
 * Uses custom Tailwind classes (NOT @tailwindcss/typography) for full RTL support.
 */
export function Prose({ children, className }: ProseProps) {
  const classes = ["prose", className].filter(Boolean).join(" ");
  return (
    <div className={classes} dir="rtl">
      {children}
    </div>
  );
}