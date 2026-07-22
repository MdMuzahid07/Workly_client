type MemberInitialsAvatarProps = {
  name: string;
  /** Passed to the root for screen readers when the avatar is meaningful */
  'aria-hidden'?: boolean;
};

/** Decorative avatar derived from display name — keep labels on the adjacent text. */
export function MemberInitialsAvatar({
  name,
  'aria-hidden': ariaHidden = true,
}: MemberInitialsAvatarProps) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials =
    parts.length >= 2
      ? `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
      : (parts[0]?.slice(0, 2).toUpperCase() ?? '?');

  return (
    <div
      aria-hidden={ariaHidden}
      className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
    >
      {initials}
    </div>
  );
}
