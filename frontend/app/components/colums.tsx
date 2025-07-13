import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

export type Admin = {
  id: string;
  roleId: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
};

export const AdminColums: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Fullname",
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      const formattedDate = date; // format date properly
      return <div className="text-right">{formattedDate as string}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(admin.id)}
            >
              Copy Admin ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Priviledges</DropdownMenuItem>
            <DropdownMenuItem>Recent Activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
