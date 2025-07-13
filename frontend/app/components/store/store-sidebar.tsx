import { forwardRef, type Ref, useImperativeHandle, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  PanelRightOpen,
  PanelRightClose,
  ChartNoAxesGantt,
  ChartArea,
  ShoppingBasket,
  MessagesSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { logout } from "~/api/api";
import { getSideBarState } from "~/lib/utils";

export interface SidebarHandle {
  toggle: () => void;
}

function StoreSideBarComponent(_props: {}, ref: Ref<SidebarHandle>) {
  const [navItems, setNavItems] = useState([
    { name: "Overview", path: "", icon: <ChartNoAxesGantt /> },
    { name: "Analytics", path: "analytics", icon: <ChartArea /> },
    { name: "Products", path: "products", icon: <ShoppingBasket /> },
    { name: "Messages", path: "messages", icon: <MessagesSquare /> },
    { name: "Settings", path: "settings", icon: <Settings /> },
  ]);
  const [isOpen, setIsOpen] = useState(getSideBarState());
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    toggle: () => setIsOpen((prevState) => !prevState),
  }));

  console.log(isOpen);

  const { mutate: mutLogout } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      navigate("/auth/login");
    },
  });

  return (
    <>
      <nav
        className={`md:flex absolute z-9998 md:static border h-full rounded-sm transition-all duration-300 overflow-hidden flex-col ${
          isOpen ? "w-[14rem] block" : "w-[3.5rem] min-w-[3.5rem] hidden"
        }`}
      >
        <div className="p-2 flex items-center justify-between transition-all duration-300 overflow-hidden">
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Link to="/store" className="text-nowrap font-bold uppercase">
                Store Logo
              </Link>
            </motion.div>
          )}

          <span
            onClick={() =>
              setIsOpen((prevState) => {
                localStorage.setItem("side-bar", prevState ? "close" : "open");
                return !prevState;
              })
            }
            className="cursor-pointer p-2"
          >
            {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
          </span>
        </div>
        <ul className="p-2 flex flex-col gap-4 flex-grow rounded-sm">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`w-full flex items-center cursor-pointer bg-gray-700 rounded-sm transition-all duration-300 overflow-hidden ${
                isOpen ? "gap-4 p-4" : "p-2 justify-center"
              }`}
            >
              <Link
                to={item.path}
                className={`flex items-center cursor-pointer bg-gray-700 rounded-sm transition-all duration-300 overflow-hidden ${
                  isOpen ? "gap-4 p-4" : "p-2 justify-center"
                }`}
              >
                <span>{item.icon}</span>
                <h3
                  className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                  }`}
                >
                  {item.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-2 w-full h-18 justify-self-end">
          <li
            onClick={() => mutLogout()}
            className={`flex items-center cursor-pointer bg-gray-700 rounded-sm transition-all duration-300 overflow-hidden ${
              isOpen ? "gap-4 p-4" : "p-2 justify-center"
            }`}
          >
            <span>
              <LogOut />
            </span>
            <h3
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
              }`}
            >
              Logout
            </h3>
          </li>
        </div>
      </nav>
    </>
  );
}
const storeSideBar = forwardRef(StoreSideBarComponent);
export default storeSideBar;
