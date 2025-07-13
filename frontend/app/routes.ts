import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/public/home.tsx"),
  route("catalog", "routes/public/catalog.tsx"),

  layout("routes/auth/layout.tsx", [
    route("auth/login", "routes/auth/login.tsx"),
    route("auth/register", "routes/auth/register.tsx"),
    route("auth/forgot-password", "routes/auth/forgot-password.tsx"),
    route("/auth/reset-password?", "routes/auth/reset-password.tsx"),
  ]),

  layout("routes/auth/auth-container.tsx", [
    route("admin", "routes/admin/dashboard.tsx", [
      index("routes/admin/overview.tsx"),
      route("settings", "routes/admin/settings/settings.tsx", [
        route("security", "routes/admin/settings/security.tsx"),
        route("roles", "routes/admin/settings/role.tsx"),
        route("roles/create", "routes/admin/create-role.tsx"),
      ]),
      route("products", "routes/admin/products/products.tsx"),
      route("customers", "routes/admin/customers/customers.tsx"),
    ]),
    route("/store", "routes/store/index.tsx", [
      index("routes/store/overview.tsx"),
      route("products", "routes/store/store-products.tsx"),
      route("analytics", "routes/store/analytics.tsx"),
      route("messages", "routes/store/messages.tsx"),
      route("settings", "routes/store/settings.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
