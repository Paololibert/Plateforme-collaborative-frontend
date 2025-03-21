"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invitation } from "@/types/invitation";

interface DataTableProps {
  data: Invitation[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "accepted":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "validated":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

type Column = {
  accessorKey?: keyof Invitation | "groupe.name" | "actions";
  header: string;
  cell?: ({ row }: { row: Invitation }) => React.ReactNode;
};

export function DataTableInvitations({ data }: DataTableProps) {
  const handleValidate = async (invitationId: string) => {
    try {
      const response = await fetch(
        `/api/invitations/validate/${invitationId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to validate invitation");
      }

      toast.success("Invitation validated successfully");
      // Refresh the page to update the status
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const columns: Column[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.email}</span>,
    },
    {
      accessorKey: "groupe.name",
      header: "Group",
      cell: ({ row }) => <span>{row.groupe.name}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={getStatusColor(row.status)}>{row.status}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Sent Date",
      cell: ({ row }) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) =>
        row.status === "accepted" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleValidate(row.id)}
          >
            Validate
          </Button>
        ),
    },
  ];

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
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.header}>
                  {column.cell ? column.cell({ row }) : null}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No invitations found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
