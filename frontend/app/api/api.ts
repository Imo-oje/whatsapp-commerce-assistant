import API from "./client";

export const login = (
  data: LoginFormInputs
): Promise<{ message: string; role: string }> => API.post("/auth/login", data);

export const registerUser = (data: RegisterFormInputs) =>{
  console.log(data) // Debugging line to check data being sent
  return API.post("/auth/register", data);
}

export const logout = () => API.get("/auth/logout");
export const refresh = () => API.get("/auth/refresh");
export const forgotPassword = (data: ForgotPassword) =>
  API.post("auth/password/forgot", data);
export const resetPassword = (data: ResetPassword) =>
  API.post("/auth/password/reset", data);

export const getUser = (): Promise<any> => API.get("/user/profile");
export const getAllAdmins = () => API.get("/admin/profile/all");
export const getAdminById = (adminId: string): Promise<any> =>
  API.get(`/admin/profile/${adminId}`);

export const searchUsers = (query: string): Promise<QueryData[]> =>
  API.get(`/admin/profile/search?query=${encodeURIComponent(query)}`);
export const createRole = (data: CreateRoleParam) =>
  API.post("/admin/role/create", data);

// TYPES and INTERFACES

interface ResetPassword {
  verificationCode: string;
  password: string;
  confirmPassword: string;
}
export interface ForgotPassword {
  email: string;
}
export interface LoginFormInputs extends ForgotPassword {
  password: string;
}
export interface RegisterFormInputs extends LoginFormInputs {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
export interface QueryData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateRoleParam {
  role_name: string;
  assignedTo: string[];
  role_permissions: string[];
}
