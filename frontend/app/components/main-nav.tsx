import { Link, NavLink } from "react-router";
import { cn } from "~/lib/utils";

const navLinks = [
  {
    path: "/admin",
    name: "Overview",
  },
  {
    path: "/admin/customers",
    name: "Customers",
  },
  {
    path: "/admin/products",
    name: "Products",
  },
  {
    path: "/admin/settings",
    name: "Settings",
  },
];

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navLinks.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            [
              isActive
                ? "text-sm font-medium transition-colors hover:text-primary"
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            ].join(" ")
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}
