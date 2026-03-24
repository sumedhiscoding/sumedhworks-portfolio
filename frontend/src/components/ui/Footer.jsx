import { SITE_NAME } from "@/components/layout/siteConstants";

export default function Footer() {
  return (
    <footer className="bg-zinc-100 p-10 text-center text-zinc-700">
      <hr className="mb-8 border-zinc-300" />
      <p>
        © {SITE_NAME} {new Date().getFullYear()}
      </p>
    </footer>
  );
}
