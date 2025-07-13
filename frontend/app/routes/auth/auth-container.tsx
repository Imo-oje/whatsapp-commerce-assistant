import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/hooks/use-auth";

export default function AuthContainer() {
  const { data, isLoading } = useAuth();

  return isLoading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoaderCircle size={60} className="animate-spin" />
    </div>
  ) : data ? (
    <div>
      <Outlet context={data} />
    </div>
  ) : (
    <Navigate
      to="/auth/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    /> //state redirect store back to original request
  );
}
