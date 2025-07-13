import { Outlet, useOutletContext } from "react-router";
import type { UserType } from "~/hooks/use-auth";

export default function Overview() {
  const user = useOutletContext<UserType>();

  return (
    <>
      <main className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:h-full pb-2">
        <div className="lg:w-3/5 flex flex-col gap-4">
          <div className="flex justify-between gap-2 md:overview-grid md:gap-4">
            <div className="border p-2 aspect-square rounded-sm w-full">
              Revenue
            </div>
            <div className="border p-2 aspect-square rounded-sm w-full">
              Sales
            </div>
            <div className="border p-2 aspect-square rounded-sm w-full">
              Customers
            </div>
          </div>

          <div className="border rounded-sm h-full p-2">chart/table</div>
        </div>

        <div className="hidden border w-1/5 xl:block rounded-sm p-2">
          Messages
        </div>
        <div className="xl:w-1/5 border w-2/5 rounded-sm p-2">
          Notifications
        </div>
      </main>
    </>
  );
}
