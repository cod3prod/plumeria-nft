import Link from "next/link";

export default function Logo() {
  return (
    <h1 className="text-2xl font-bold tracking-tight headline">
      <Link href="/" className="cursor-pointer">
        PLUMERIA
      </Link>
    </h1>
  );
}
