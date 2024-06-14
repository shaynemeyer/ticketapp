import prisma from "@/prisma/db";
import DataTable from "./DataTable";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <DataTable tickets={tickets} />
      </div>
    </div>
  );
};
export default Tickets;
