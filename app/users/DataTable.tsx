import UserRoleBadge from "@/components/UserRoleBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateForDisplay } from "@/lib/formats";
import { User } from "@prisma/client";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";

interface DataTableProps {
  users: User[];
  searchParams: SearchParams;
}

const DataTable = ({ users, searchParams }: DataTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary hover:bg-secondary">
          <TableHead>
            <Link href={{ query: { ...searchParams, orderBy: "name" } }}>
              Name
            </Link>
            {"name" === searchParams.orderBy && (
              <ArrowDown className="inline p-1" />
            )}
          </TableHead>
          <TableHead>
            <Link href={{ query: { ...searchParams, orderBy: "username" } }}>
              Username
            </Link>
            {"username" === searchParams.orderBy && (
              <ArrowDown className="inline p-1" />
            )}
          </TableHead>
          <TableHead>
            <div className="flex flex-row justify-center">
              <Link href={{ query: { ...searchParams, orderBy: "role" } }}>
                <div className="flex justify-center">Role </div>
              </Link>
              {"role" === searchParams.orderBy && (
                <ArrowDown className="inline p-1" />
              )}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users
          ? users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <UserRoleBadge role={user.role} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};
export default DataTable;
