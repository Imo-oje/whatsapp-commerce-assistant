import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { getAdminById, getAllAdmins } from "~/api/api";
import { type Admin, AdminColums } from "~/components/colums";
//import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function RoleSettings() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();
  const tableData: Admin[] = [
    {
      id: "728ed52f",
      roleId: "728ed72f",
      name: "John Doe",
      role: "ADMIN",
      createdAt: "Yesterday",
      email: "f@example.com",
    },
    {
      id: "728ed54f",
      roleId: "722ed52f",
      name: "John Hoe",
      role: "USER",
      createdAt: "Yesterday",
      email: "e@example.com",
    },
  ];

  const {
    data: adminAll,
    isPending: isPendingAll,
    isError: isErrorAll,
  } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: getAllAdmins,
  });

  const {
    data: admin,
    isPending,
    isError,
    error,
  } = useQuery<any, Error>({
    queryKey: ["getAdmin", selectedUserId],
    queryFn: () => getAdminById(selectedUserId),
  });

  const getAdmin = (adminId: string) => {
    setSelectedUserId(adminId);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Roles</h3>
        <div className="flex gap-x-2">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary">
            <span>
              <PlusCircle />
            </span>
            Assign
          </Button>
          <Button
            onClick={() => navigate("create")}
            className="bg-primary text-primary-foreground"
          >
            <PlusCircle />
            New Role
          </Button>
        </div>
      </div>
      <Tabs defaultValue="roles" className="space-y-4">
        <div className="border-b pb-[2px]">
          <TabsList className="bg-transparent flex gap-2">
            <TabsTrigger
              value="roles"
              className="py-2 data-[state=active]:text-primary data-[state=active]:border-b-1 transition-all border-primary"
            >
              All Roles
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="py-2 data-[state=active]:text-primary data-[state=active]:border-b-1 transition-all border-primary"
            >
              Permissions
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="roles">RolesView</TabsContent>
        <TabsContent value="permissions">PermissionViews</TabsContent>
      </Tabs>
      {/* <p className="text-muted-foreground">
        Manage store roles and permissions to control access to different parts
        of the application.
      </p>
      <div className="w-full flex items-start gap-6 justify-between">
        <div className="container mx-auto">
          <DataTable
            columns={AdminColums}
            data={tableData}
            sendDetails={getAdmin}
          />
        </div>
        <div className="flex-3/5">
          {isPending ? "loading..." : admin?.email}
        </div>
      </div> */}
    </div>
  );
}
