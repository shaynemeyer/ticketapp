"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  ticketId: number;
}

const DeleteButton = ({ ticketId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/tickets/${ticketId}`, {
        method: "DELETE",
      });
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Unknown error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({
            variant: "destructive",
          })}
          disabled={isDeleting}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({
                variant: "destructive",
              })}
              disabled={isDeleting}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
};
export default DeleteButton;
