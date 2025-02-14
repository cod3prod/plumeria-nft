export default function PremiumInfo({ holding }: { holding: number }) {
  if (holding === 0) return null;

  return (
    <div className="absolute top-4 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-1 text-xs font-bold rounded-full">
      🌼 X{holding} 🌼
    </div>
  );
}
