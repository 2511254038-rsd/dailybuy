const KEY = "dailybuy_recently_viewed";
const MAX_ITEMS = 10;

export const addRecentlyViewed = (productId: string) => {
  if (typeof window === "undefined") return;
  const existing = getRecentlyViewed().filter((id) => id !== productId);
  const updated = [productId, ...existing].slice(0, MAX_ITEMS);
  localStorage.setItem(KEY, JSON.stringify(updated));
};

export const getRecentlyViewed = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};