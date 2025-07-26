import { forwardRef, type Ref, useImperativeHandle, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  PanelRightOpen,
  PanelRightClose,
  ChartArea,
  ShoppingBasket,
  MessagesSquare,
  Settings,
  LogOut,
  LayoutDashboard,
  Rocket,
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
    { name: "Overview", path: "", icon: <LayoutDashboard />, active: true },
    {
      name: "Analytics",
      path: "analytics",
      icon: <ChartArea />,
      active: false,
    },
    {
      name: "Products",
      path: "products",
      icon: <ShoppingBasket />,
      active: false,
    },
    {
      name: "Messages",
      path: "messages",
      icon: <MessagesSquare />,
      active: false,
    },
    { name: "Settings", path: "settings", icon: <Settings />, active: false },
  ]);
  const [isOpen, setIsOpen] = useState(getSideBarState());
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    toggle: () => setIsOpen((prevState) => !prevState),
  }));

  console.log(isOpen);

  // const { mutate: mutLogout } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: (data) => {
  //     navigate("/auth/login");
  //   },
  // });

  return (
    <>
      <nav
        className={`bg-white md:flex fixed z-9998 md:static bottom-0 top-0 transition-all duration-300 overflow-hidden flex-col ${
          isOpen ? "w-[14rem] block" : "w-[4rem] min-w-[3.5rem] hidden"
        }`}
      >
        <div className="p-2 flex items-center justify-between transition-all duration-300 overflow-hidden">
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Link
                to="/store"
                className="text-nowrap font-bold uppercase text-blue-900 text-xl"
              >
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
        <div className="border h-[93%] relative">
          <ul className="p-2 flex flex-col gap-2 flex-grow rounded-sm text-gray-600">
            <div className="p-2 -mb-2">General</div>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`w-full flex items-center cursor-pointer rounded-sm transition-all duration-300 overflow-hidden ${
                  isOpen ? "gap-2" : "p-2 justify-center"
                }`}
              >
                <Link
                  to={item.path}
                  onClick={() =>
                    setNavItems((prevState) =>
                      prevState.map((el) => ({
                        ...el,
                        active: el.path === item.path ? true : false,
                      }))
                    )
                  }
                  className={`w-full flex items-center cursor-pointer hover:bg-gray-100 rounded-sm p-2 transition-all duration-300 overflow-hidden ${
                    isOpen ? "gap-4" : "justify-center"
                  } ${item.active ? "bg-gray-100 text-black font-bold" : ""}`}
                >
                  <span className="size-6">{item.icon}</span>
                  <h3
                    className={`transition-all duration-300 whitespace-nowrap overflow-hidden  ${
                      isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                    }`}
                  >
                    {item.name}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>

          <div className="p-2 w-[95%] flex flex-col justify-center gap-4 h-auto justify-self-end border border-blue-200 mx-auto mb-2 rounded-lg absolute bottom-0">
            {/* <li
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
          </li> */}
            <div className="flex justify-center flex-col">
              <p className="font-semibold text-sm">Storage</p>
              <span className="text-xs font-semibold">128gb of 256gb</span>
            </div>
            <button className="flex items-center justify-center bg-blue-900 p-2 rounded-lg text-white gap-2 cursor-pointer w-full text-center">
              <span>
                <Rocket size={16} />
              </span>
              Upgrade Plan
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
const storeSideBar = forwardRef(StoreSideBarComponent);
export default storeSideBar;
