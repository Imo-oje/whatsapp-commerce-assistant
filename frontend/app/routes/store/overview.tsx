import {
  CircleDollarSign,
  Coins,
  ListFilter,
  Share,
  Share2,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import { Outlet, useOutletContext } from "react-router";
import { LineChartView } from "~/components/store/charts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { UserType } from "~/hooks/use-auth";

export default function Overview() {
  const user = useOutletContext<UserType>();

  return (
    <>
      <main className="pl-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold py-4">Dashboard</h2>
          <div className="flex items-center gap-4 px-4">
            <button className="bg-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-1 text-xs font-semibold">
              <ListFilter size={14} />
              <span>Filter</span>
            </button>
            <button className="bg-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-1 text-xs font-semibold">
              <Share2 size={14} />
              <span>Share</span>
            </button>
            <button className="bg-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-1 text-xs font-semibold">
              <Share size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:h-full pb-2">
          <div className="lg:w-3/5 flex flex-col gap-4">
            <div className="flex justify-between gap-2 md:overview-grid md:gap-4">
              <div className="bg-white p-2 rounded-lg w-full flex flex-col gap-2">
                <h3 className="flex items-center gap-1 text-sm font-bold">
                  <span className="text-blue-900">
                    <CircleDollarSign size={16} />
                  </span>
                  Total Income
                </h3>

                <span className="inline-flex gap-1 text-xl">
                  <b>$509,34</b>
                  <span className="border px-1 flex items-center rounded-sm text-xs">
                    hello
                  </span>
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg w-full flex flex-col gap-2">
                <h3 className="flex items-center gap-1 text-sm font-bold">
                  <span className="text-blue-900">
                    <Coins size={16} />
                  </span>
                  Total Revenue
                </h3>

                <span className="inline-flex gap-1 text-xl">
                  <b>$442,04</b>
                  <span className="border px-1 flex items-center rounded-sm text-xs">
                    hello
                  </span>
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg w-full flex flex-col gap-2">
                <h3 className="flex items-center gap-1 text-sm font-bold">
                  <span className="text-blue-900">
                    <ShoppingBasket size={16} />
                  </span>
                  Product Sold
                </h3>

                <span className="inline-flex gap-1 text-xl">
                  <b>781</b>
                  <span className="border px-1 flex items-center rounded-sm text-xs">
                    hello
                  </span>
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg w-full flex flex-col gap-2">
                <h3 className="flex items-center gap-1 text-sm font-bold">
                  <span className="text-blue-900">
                    <UsersRound size={16} />
                  </span>
                  Customers
                </h3>

                <span className="inline-flex gap-1 text-xl">
                  <b>3,045</b>
                  <span className="border px-1 flex items-center rounded-sm text-xs">
                    hello
                  </span>
                </span>
              </div>
            </div>

            <div className="p-2 bg-white rounded-lg flex flex-col gap-4  h-fit">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Stats Overview</h3>
                <Select>
                  <SelectTrigger className="w-[105px]">
                    <SelectValue placeholder="Weekly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* CHART */}
              <LineChartView />
            </div>
          </div>

          <div className="hidden w-1/5 xl:block rounded-sm p-2">Messages</div>
          <div className="xl:w-1/5 w-2/5 rounded-sm p-2">Notifications</div>
        </div>
      </main>
    </>
  );
}
