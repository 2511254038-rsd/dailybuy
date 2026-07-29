"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { User } from "@/types";
import Avatar from "@/components/common/Avatar";

interface DashboardHeaderProps {
  user: User;
  onUpdateAvatar: (url: string) => Promise<void>;
}

export default function DashboardHeader({ user, onUpdateAvatar }: DashboardHeaderProps) {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(user.avatar || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdateAvatar(url);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="relative">
        <Avatar name={user.name} avatar={user.avatar} size={88} />
        <button
          onClick={() => setEditing((v) => !v)}
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: "#2563eb" }}
          aria-label="Update photo"
        >
          <Camera size={14} />
        </button>
      </div>

      {editing && (
        <div className="flex gap-2 mt-3 w-full max-w-xs">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste image/drive link"
            className="flex-1 border rounded px-2 py-1.5 text-xs"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs bg-gray-900 text-white rounded px-3 disabled:opacity-50"
          >
            {saving ? "..." : "Save"}
          </button>
        </div>
      )}

      <h1 className="font-semibold text-lg mt-3">{user.name}</h1>
      <p className="text-sm text-gray-500">{user.email}</p>
      <p className="text-sm text-gray-500">{user.phone}</p>
    </div>
  );
}