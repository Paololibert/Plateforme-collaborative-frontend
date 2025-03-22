"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconTrash } from "@tabler/icons-react"; // Import the trash icon
import { removeMember } from "@/utils/api";

interface User {
  id: string;
  name: string;
  firstname: string;
  email: string;
}

interface DataTableProps {
  data: User[];
  groupId: string;
  createdById: string;
  createdBy: User; 
  currentUserId: string; 
}

export function DataTableMembers({
  data,
  groupId,
  createdById,
  createdBy,
  currentUserId, 
}: DataTableProps) {
  const router = useRouter();

  // Combine creator and members data
  const allMembers = [
    createdBy, 
    ...data.filter((member) => member.id !== createdBy.id), // filter out the creator
  ];

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember(groupId, memberId);
      toast.success("Member removed successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: User }) => (
        <div className="flex items-center">
          <span>{row.name}</span>
          {row.id === createdById && (
            <Badge
              variant="outline"
              className="ml-2 text-blue-500 border-blue-500"
            >
              Admin
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "firstname",
      header: "First Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: User }) =>
        //update the condition to check if the current user is the creator and the member is not the creator
        currentUserId === createdById &&
        row.id !== createdById && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveMember(row.id)}
            className="hover:text-red-500"
          >
            <IconTrash size={18} />
          </Button>
        ),
    },
  ];

  if (!groupId || typeof groupId !== "string") {
    return <div>Error: Invalid group ID</div>;
  }

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allMembers.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.header}>
                {column.cell
                  ? column.cell({ row })
                  : column.accessorKey
                  ? (row[column.accessorKey as keyof User] as React.ReactNode)
                  : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
