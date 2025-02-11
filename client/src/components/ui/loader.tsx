export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 border-4 border-purple-500 rounded-full animate-ping" />

        <div className="w-20 h-20 border-4 border-t-transparent border-purple-300 rounded-full animate-spin" />

        <div className="absolute flex space-x-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300" />
        </div>

        <div className="absolute inset-0 rounded-full shadow-lg shadow-purple-500/30 animate-pulse" />
      </div>
    </div>
  );
}
