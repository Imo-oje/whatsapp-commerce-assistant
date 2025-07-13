import type { Route } from "./+types/settings";
import {
  CircleDollarSign,
  Fingerprint,
  HandCoins,
  KeyRound,
  Settings,
  Store,
  User2,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin | Settings" }];
}

const settings = [
  {
    name: "General",
    path: "",
    icon: <Settings size={18} />,
  },
  {
    name: "Payments",
    path: "payments",
    icon: <HandCoins size={18} />,
  },
  {
    name: "Products & Listings",
    path: "products",

    icon: <Store size={18} />,
  },
  {
    name: "User Management",
    path: "users",

    icon: <User2 size={18} />,
  },
  {
    name: "Fees",
    path: "fees",

    icon: <CircleDollarSign size={18} />,
  },
  {
    name: "Roles",
    path: "roles",
    icon: <KeyRound size={18} />,
  },
  {
    name: "Security",
    path: "security",
    icon: <Fingerprint size={18} />,
  },
];

export default function () {
  return (
    <>
      <div className="flex space-x-6">
        <nav className="w-2/12 p-2 rounded-lg">
          <ul className="flex flex-col gap-1 text-left">
            {settings.map((setting, index) => (
              <NavLink
                key={index}
                to={setting.path as string}
                className={({ isActive }) =>
                  [isActive ? "text-red-600" : "text-sky-600"].join("")
                }
              >
                <span className="float-left mr-3">{setting.icon}</span>{" "}
                <p>{setting.name}</p>
              </NavLink>
            ))}
          </ul>
        </nav>
        <main className="w-full rounded-sm p-2">
          <Outlet />
        </main>
      </div>
    </>
  );
}
