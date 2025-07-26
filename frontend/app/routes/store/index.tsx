import { Outlet, useOutletContext } from "react-router";
import type { UserType } from "~/hooks/use-auth";
import type { Route } from "./+types/index";
import StoreSideBar, {
  type SidebarHandle,
} from "~/components/store/store-sidebar";
import StoreNavBar from "~/components/store/store-nav-bar";
import { useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Store" },
    { description: "Store description", content: "some store content" },
  ];
}

export default function Index() {
  const user = useOutletContext<UserType>();

  const sideBarRef = useRef<SidebarHandle>(null);

  function handleOpenSideBar() {
    sideBarRef.current?.toggle();
  }

  return (
    <>
      <div className="max-h-screen flex top-0 bottom-0 overflow-y-auto fixed bg-gray-200 w-full md:gap-2 md:pr-2">
        <StoreSideBar ref={sideBarRef} />
        <div className="w-full flex flex-col h-full overflow-y-scroll">
          <StoreNavBar user={user} onMenuClick={handleOpenSideBar} />
          <Outlet context={user} />
        </div>
      </div>
    </>
  );
}
