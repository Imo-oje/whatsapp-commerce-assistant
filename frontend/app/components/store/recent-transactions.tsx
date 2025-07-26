import { ListFilter } from "lucide-react";

export default function () {
  const tableHeader = ["Name", "Price", "Customer", "Status", "Action"];

  const tableData = Array.from({ length: 7 }, () => ({
    name: ["iPhone 15", "Samsung S24", "Pixel 8", "OnePlus 12", "Xiaomi 14"][
      Math.floor(Math.random() * 5)
    ],
    price: `$${(Math.random() * 1500 + 300).toFixed(2)}`,
    customer: [
      "Ned Stark",
      "Arya Stark",
      "Jon Snow",
      "Daenerys Targaryen",
      "Tyrion Lannister",
    ][Math.floor(Math.random() * 5)],
    status: ["completed", "pending", "cancelled", "refunded"][
      Math.floor(Math.random() * 4)
    ],
    action: "url",
  }));

  return (
    <div className="flex flex-col h-full mt-2">
      <div className="p-2 bg-white rounded-lg flex flex-col h-fit">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Transactions</h3>
          <button className="bg-white p-2 cursor-pointer border rounded-lg flex items-center justify-center gap-1 text-xs font-semibold">
            <ListFilter size={14} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* table header */}
      <div className="flex w-full gap-6 justify-between p-2 font-semibold text-sm pr-2">
        {tableHeader.map((item) => (
          <span className="w-1/5 truncate text-left text-nowrap">{item}</span>
        ))}
      </div>

      {/* table data */}
      <div className="rounded-lg text-gray-600 px-2 flex flex-col max-h-[75%] bg-white overflow-y-scroll">
        {tableData.map((data) => (
          <div className="flex justify-center py-4 border-b-2 w-full bg-white pr-2 gap-6">
            <span className="w-1/5 truncate text-left text-nowrap">
              {data.name}
            </span>
            <span className="w-1/5 truncate text-left text-nowrap">
              {data.price}
            </span>
            <span className="w-1/5 truncate text-left text-nowrap">
              {data.customer}
            </span>
            <span className="w-1/5 truncate text-left text-nowrap">
              {data.status}
            </span>
            <span className="w-1/5 truncate text-left text-nowrap">
              {data.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
