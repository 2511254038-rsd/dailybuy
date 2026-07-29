export default function Loading({ text = "Loading..." }: { text?: string }) {
  return <p className="text-center text-gray-500 py-8">{text}</p>;
}