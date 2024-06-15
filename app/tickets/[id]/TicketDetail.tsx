import { Ticket } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import { formatDateForDisplay } from "@/lib/formats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Markdown from "react-markdown";

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created: {formatDateForDisplay(ticket.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <Markdown>{ticket.description}</Markdown>
        </CardContent>
        <CardFooter>
          Updated: {formatDateForDisplay(ticket.updatedAt)}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Ticket
        </Link>
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: "destructive",
          })}`}
        >
          Delete Ticket
        </Link>
      </div>
    </div>
  );
};
export default TicketDetail;
