import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

interface SearchParams {
  page: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const skip = (page - 1) * pageSize;

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip,
  });

  const ticketCount = await prisma.ticket.count();

  return (
    <div className="w-full mt-5">
      <div className="text-right mb-4">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
      </div>
      <div className="rounded-md sm:border">
        <DataTable tickets={tickets} />
      </div>
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default Tickets;
