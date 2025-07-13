import { Navigate, Outlet, useOutletContext } from "react-router";
import MainNav from "~/components/main-nav";
import ProfileNav from "~/components/profile-nav";
import Search from "~/components/search";
import TeamSwitcher from "~/components/team-switcher";
import type { UserType } from "~/hooks/use-auth";

export default function Dashboard() {
  const user = useOutletContext<UserType>();
  console.log(user.role.name);

  if (user.role.name === "ADMIN") {
    return (
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ProfileNav user={user} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Outlet context={user} />
        </div>
      </div>
    );
  }

  return (
    <Navigate
      to="/"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
}
