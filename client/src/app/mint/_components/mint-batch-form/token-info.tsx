export default function TokenInfo({
  tokenId,
  result,
}: {
  tokenId: number;
  result: number | undefined;
}) {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <p className="text-white text-lg font-semibold">Token ID : {tokenId}</p>
        <p className="text-gray-300 text-sm mt-1">{`${
          result ? result.toLocaleString() : 0
        }/ 5,000`}</p>
      </div>
    </div>
  );
}
