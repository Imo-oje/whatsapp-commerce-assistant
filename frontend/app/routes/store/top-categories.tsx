import { RaderChart } from "~/components/store/charts";

export default function TopCaregories() {
  return (
    <div className="bg-white p-2 rounded-xl flex-1 w-full h-full">
      <h3 className="font-semibold mb-2">Top categories</h3>
      <RaderChart />
    </div>
  );
}
