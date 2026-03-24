/** Full Tailwind classes — avoid dynamic `text-${x}` so purge keeps them. */
const TEXT = {
  "Product Reviews": "text-orange-600",
  "Travel Guides": "text-green-600",
  Opinions: "text-red-600",
  MeowCity: "text-purple-600",
};

export function getCategoryTextClass(category) {
  return TEXT[category] ?? "text-gray-700";
}

export default getCategoryTextClass;
