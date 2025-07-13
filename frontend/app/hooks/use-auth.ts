import { useQuery } from "@tanstack/react-query";
import { getUser } from "~/api/api";

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: { name: string };
}

export const useAuth = () =>
  useQuery<UserType>({
    queryKey: ["auth"],
    queryFn: getUser,
    retry: false,
  });
