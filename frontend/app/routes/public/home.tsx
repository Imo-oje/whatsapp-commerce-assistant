import { useAuth } from "~/hooks/use-auth";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { data: user } = useAuth();
  return (
    <>
      <p>{user?.firstName}</p>
      <div className="flex gap-6">
        <Link to="/store">store</Link>
        <Link to="/admin">admin</Link>
        <Link to="/auth/login">login</Link>
        <Link to="/auth/register">register</Link>
        <Link to="/catalog">Catalog</Link>
      </div>
    </>
  );
}
