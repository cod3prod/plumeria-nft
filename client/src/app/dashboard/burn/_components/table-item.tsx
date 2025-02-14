import DeleteButton from "./delete-button";
import NumberStepper from "./number-stepper";

export default function TableItem({
  item,
  holding,
}: {
  item: TrashItem;
  holding: number;
}) {

  return (
    <tr key={item.tokenId} className="border-b">
      <td className="py-3 px-4 text-center">{item.tokenId}</td>
      <td className="py-3 px-4">
        <NumberStepper item={item} holding={holding} />
        {/* <div className="flex justify-center items-center space-x-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={() => setAmount((prev) => Math.max(prev - 1, 0))}
          >
            -
          </button>
          <span className="w-12 text-center">{amount}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={() => setAmount((prev) => prev + 1)}
          >
            +
          </button>
        </div> */}
      </td>
      <td className="py-3 px-4 text-center">
        <DeleteButton item={item} />
      </td>
    </tr>
  );
}
