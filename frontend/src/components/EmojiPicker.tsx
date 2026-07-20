import { useEffect, useRef, useState } from "react";

const EMOJI_OPTIONS = [
  "🍎", "🍊", "🍇", "🍑", "🍓", "🥭", "🍈", "🍐",
  "🚚", "🚛", "📦", "🏪",
  "📊", "📈", "💰",
  "🔍", "✅", "🛡️",
  "💬", "📞", "🤝",
  "⭐", "🌱", "☀️",
];

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="emoji-picker" ref={containerRef}>
      <button
        type="button"
        className="emoji-picker__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span aria-hidden="true">{value || "➕"}</span>
      </button>

      {open && (
        <div className="emoji-picker__panel">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={
                emoji === value ? "emoji-picker__option emoji-picker__option--selected" : "emoji-picker__option"
              }
              onClick={() => {
                onChange(emoji);
                setOpen(false);
              }}
              aria-label={`아이콘 ${emoji} 선택`}
              aria-pressed={emoji === value}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
