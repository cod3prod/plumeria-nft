import DeleteButton from "./delete-button";

export default function TokenHandler({ tokenId }: { tokenId: number }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <div className="h-full absolute flex flex-col grow justify-between bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <p className="text-white text-sm font-semibold">ID:{tokenId}</p>
        <DeleteButton tokenId={tokenId} />
      </div>
    </div>
  );
}
