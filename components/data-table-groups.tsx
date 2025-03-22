"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { IconTrash } from "@tabler/icons-react";
import { deleteGroup } from "@/utils/api";
import { toast } from "sonner";

interface Group {
  id: string;
  name: string;
  description: string;
  createdBy: {
    id: string;
  };
}

interface DataTableProps {
  data: Group[];
  currentUserId: string;
}

export function DataTableGroups({ data, currentUserId }: DataTableProps) {
  const router = useRouter();

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      toast.success("Group deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete group"
      );
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Group }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/groups/${row.id}`)}
          >
            View Members
          </Button>
          {row.createdBy.id === currentUserId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteGroup(row.id)}
              className="hover:text-red-500"
            >
              <IconTrash size={18} />
            </Button>
          )}
        </div>
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
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.header}>
                {column.cell
                  ? column.cell({ row })
                  : column.accessorKey
                  ? (row[column.accessorKey as keyof Group] as React.ReactNode)
                  : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
