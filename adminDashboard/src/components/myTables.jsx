import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const MyTables = () => {
  return (
    <Table className="w-1/2 bg-black text-white ">
      <TableHeader>
        <TableRow  >
          <TableHead className="w-[100px]  ">Team1</TableHead>
          <TableHead className="w-[100px]">Team2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
