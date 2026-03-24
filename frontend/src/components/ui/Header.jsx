export default function Header({ title, subtitle }) {
  return (
    <header className="px-4 pt-10 pr-4 pl-4">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="h1-display font-bold text-zinc-950">{title}</h1>
        {subtitle ? (
          <p className="mt-2 max-w-xl text-lg text-zinc-600">{subtitle}</p>
        ) : null}
      </div>
    </header>
  );
}
