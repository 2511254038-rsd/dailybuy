interface AvatarProps {
  name: string;
  avatar?: string;
  size?: number;
}

export default function Avatar({ name, avatar, size = 36 }: AvatarProps) {
  const initial = name?.charAt(0).toUpperCase() || "?";

  if (avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatar}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover shrink-0"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className="rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold shrink-0"
    >
      {initial}
    </div>
  );
}