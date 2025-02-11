import { FaXmark } from "react-icons/fa6";

export default function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <h2 className="text-lg md:text-2xl text-center font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FaXmark className="w-8 h-8" />
        </button>

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
}
