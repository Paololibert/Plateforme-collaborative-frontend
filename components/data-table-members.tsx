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
import { IconTrash } from "@tabler/icons-react"; // Ajouter cet import

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
  createdBy: User; // Assurez-vous que c'est de type User complet
  currentUserId: string; // Ajouter cette prop
}

export function DataTableMembers({
  data,
  groupId,
  createdById,
  createdBy,
  currentUserId, // Ajouter ce paramètre
}: DataTableProps) {
  const router = useRouter();

  // Combine creator and members data
  const allMembers = [
    createdBy, // Ajouter le créateur en premier
    ...data.filter((member) => member.id !== createdBy.id), // Filtrer le créateur s'il est aussi dans data
  ];

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await fetch(
        `/api/groups/${groupId}/members/${memberId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove member");
      }

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
        // Modifier la condition pour n'afficher le bouton que si l'utilisateur connecté est l'admin
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
