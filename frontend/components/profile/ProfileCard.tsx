import { User } from "@/types";

export default function ProfileCard({ user }: { user: User }) {
  return (
    <div className="border rounded-lg p-4 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
        {user.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-500">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
        {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
      </div>
    </div>
  );
}