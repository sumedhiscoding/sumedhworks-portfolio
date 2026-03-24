export default function BlogNewsletterForm() {
  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="blog-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="blog-newsletter-email"
        name="email"
        type="email"
        placeholder="Email address"
        autoComplete="email"
        className="min-h-12 flex-1 border border-white/25 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50"
      />
      <button
        type="submit"
        className="min-h-12 shrink-0 bg-white px-8 text-[11px] font-semibold tracking-[0.2em] text-black uppercase transition hover:bg-neutral-200"
      >
        Subscribe
      </button>
    </form>
  );
}
