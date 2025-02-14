import Link from "next/link";
import { FaEnvelope, FaGithub, FaEthereum } from "react-icons/fa";

const data = [
  {
    name: "GitHub",
    href: "https://github.com/cod3prod/plumeria-nft",
    icon: <FaGithub className="h-6 w-6" />,
  },
  {
    name: "Contract Address",
    href: "https://sepolia.etherscan.io/address/0x8b1DC4514CD415de77abED59131941113ACADe0f",
    icon: <FaEthereum className="h-6 w-6" />,
  },
  {
    name: "Email",
    href: "mailto:cod3prod@gmail.com",
    icon: <FaEnvelope className="h-6 w-6" />,
  },
];

export default function SocialLink() {
  return (
    <div className="flex space-x-6 mb-4 md:mb-0">
      {data.map((el, idx) => (
        <Link
          key={idx}
          href={el.href}
          className="text-gray-500 hover:text-pink-500 transition-colors"
          aria-label={el.name}
        >
          {el.icon}
        </Link>
      ))}
    </div>
  );
}
