export default function ConditionalRenderer({ condition, children }) {
  if (!condition) return null;
  return children;
}
