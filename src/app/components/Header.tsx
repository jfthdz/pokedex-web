import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      id="main-header"
      className="flex justify-center bg-red-500 text-white py-4 shadow-md transition-colors duration-300"
    >
      <div className="mx-auto px-4 flex justify-center items-center">
        <Link href="/" className="flex gap-4 items-center">
          <img
            src="/assets/icons/pokedex_logo.png"
            alt="Pokedex Logo"
            className="w-12 h-12"
          />
          <h1 className="font-retro text-2xl">Pokédex</h1>
        </Link>
      </div>
      <ThemeToggle></ThemeToggle>
    </header>
  );
}
