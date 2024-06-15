import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

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
      <Pagination itemCount={50} pageSize={5} currentPage={1} />
    </div>
  );
};
export default Tickets;
