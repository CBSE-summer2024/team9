export default function Header() {
  return (
    // use tailwind
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-sm">
      <h1 className="text-2xl">Container Project</h1>

      <nav className="flex justify-end">
        <a href="/" className="text-white hover:text-gray-300 px-2">
          Home
        </a>

        <a
          href="/recent-products"
          className="text-white hover:text-gray-300 px-2"
        >
          Recent Product
        </a>
      </nav>
    </header>
  );
}
