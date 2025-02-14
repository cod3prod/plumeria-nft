import { createPortal } from "react-dom";

export default function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg md:text-2xl text-center font-semibold mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-6 right-6 hover:text-gray-300 cursor-pointer">
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
