import type { UserType } from "~/hooks/use-auth";
import { type MouseEventHandler } from "react";
import { MenuSquare } from "lucide-react";

export default function StoreNavBar({
  user,
  onMenuClick,
}: {
  user: UserType;
  onMenuClick: MouseEventHandler<HTMLDivElement>;
}) {
  const openSideBar = () => {};

  return (
    <>
      <nav className="border px-2 rounded-sm flex justify-between items-center">
        <select
          id="select-store"
          name="select-store"
          className="p-2 border rounded-sm hidden md:block"
        >
          <option value="one">My favorite store</option>
          <option value="two">Another store</option>
        </select>

        <div onClick={onMenuClick} className="cursor-pointer md:hidden">
          <MenuSquare />
        </div>

        <h2 className="hidden md:block font-bold capitalize text-nowrap">
          smart nav here
        </h2>

        <div className="p-2 flex items-center gap-2">
          <span className="hidden md:block">{user.email}</span>
          <div className="border w-10 h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
            ES
          </div>
        </div>
      </nav>
    </>
  );
}
