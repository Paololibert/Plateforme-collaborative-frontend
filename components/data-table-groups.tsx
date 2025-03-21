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

interface Group {
  id: string;
  name: string;
  description: string;
}

interface DataTableProps {
  data: Group[];
}

export function DataTableGroups({ data }: DataTableProps) {
  const router = useRouter();

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
        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/groups/${row.id}`)}
        >
          View Members
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
