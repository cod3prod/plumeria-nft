import { CiNoWaitingSign } from "react-icons/ci";

export default function EmptyTable() {
  return (
    <tr>
      <td colSpan={3} className="py-4 text-center text-gray-500">
        <p className="text-7xl flex justify-center items-center">
          <CiNoWaitingSign />
        </p>
        <p>No data available</p>
      </td>
    </tr>
  );
}
