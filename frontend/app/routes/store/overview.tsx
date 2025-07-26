import {
  CircleDollarSign,
  Coins,
  ListFilter,
  Share,
  Share2,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import { useOutletContext } from "react-router";
import Activities from "~/components/store/activities";
import { LineChartView } from "~/components/store/charts";
import RecentTransactions from "~/components/store/recent-transactions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { UserType } from "~/hooks/use-auth";
import TopCaregories from "./top-categories";
import Trending from "./trending";

export default function Overview() {
  const user = useOutletContext<UserType>();

  return (
    <>
      <main className="px-2 md:p-0">
        {/* ===================== */}
        <div className="flex items-center justify-between py-2">
          <h2 className="font-bold text-lg">Dashboard</h2>
          <div className="flex items-center gap-2">
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
        {/* ======================== */}
        <div className="mt-2 lg:grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 || md:grid-cols-4">
              <div className="bg-white p-2 rounded-lg w-full flex flex-col gap-2">
                <h3 className="flex items-center gap-1 text-sm font-bold">
                  <span className="text-blue-900">
                    <CircleDollarSign size={16} />
                  </span>
                  Total Income
                </h3>

                <span className="inline-flex gap-1 text-xl flex-wrap">
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

                <span className="inline-flex gap-1 text-xl flex-wrap">
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

                <span className="inline-flex gap-1 text-xl flex-wrap">
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

                <span className="inline-flex gap-1 text-xl flex-wrap">
                  <b>3,045</b>
                  <span className="border px-1 flex items-center rounded-sm text-xs">
                    hello
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-2 p-2 bg-white rounded-lg flex flex-col gap-4">
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

            {/* RECENT TRANSACTIONS */}

            <RecentTransactions />
          </div>

          <div className="border-red-600 mt-4 md:mt-0 gap-2 lg:grid grid-cols-1 xl:grid-cols-2 grid-rows-2 max-h-full">
            <div className="hidden xl:block">
              <TopCaregories />
            </div>
            <div>
              <Activities />
            </div>
            <div className="hidden xl:block">hello</div>
            <div className="">hello</div>
          </div>
        </div>
      </main>
    </>
  );
}
