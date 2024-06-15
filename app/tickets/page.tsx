import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
    </div>
  );
};
export default Tickets;
