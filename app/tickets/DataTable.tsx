import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateForDisplay } from "@/lib/formats";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";

interface DataTableProps {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const DataTable = ({ tickets, searchParams }: DataTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Link href={{ query: { ...searchParams, orderBy: "title" } }}>
              Title
            </Link>
            {"title" === searchParams.orderBy && (
              <ArrowDown className="inline p-1" />
            )}
          </TableHead>
          <TableHead>
            <div className="flex flex-row justify-center">
              <Link href={{ query: { ...searchParams, orderBy: "status" } }}>
                <div className="flex justify-center">Status </div>
              </Link>
              {"status" === searchParams.orderBy && (
                <ArrowDown className="inline p-1" />
              )}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex flex-row justify-center">
              <Link href={{ query: { ...searchParams, orderBy: "priority" } }}>
                <div className="flex justify-center">Priority</div>
              </Link>
              {"priority" === searchParams.orderBy && (
                <ArrowDown className="inline p-1" />
              )}
            </div>
          </TableHead>
          <TableHead>
            <Link href={{ query: { ...searchParams, orderBy: "createdAt" } }}>
              Created At
            </Link>
            {"createdAt" === searchParams.orderBy && (
              <ArrowDown className="inline p-1" />
            )}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets
          ? tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </TableCell>
                <TableCell>{formatDateForDisplay(ticket.createdAt)}</TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};
export default DataTable;
