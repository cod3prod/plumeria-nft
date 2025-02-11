import Link from "next/link";

const elements = [
  { name: "Home", path: "/" },
  { name: "Mint", path: "/mint" },
  { name: "My", path: "/dashboard" },
  { name: "Send", path: "/send" },
];


export default function PCNav() {
  return (
    <nav className="hidden md:flex items-center h-full">
      {elements.map((el: { name: string; path: string }, idx: number) => (
        <Link
          key={idx}
          className="group relative h-full min-w-20 flex justify-center items-center text-gray-700 hover:text-pink-500 transition-all duration-300"
          href={el.path}
        >
          <span className="flex justify-center items-center rounded-lg group-hover:bg-gray-100 h-10 w-full">
            {el.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
