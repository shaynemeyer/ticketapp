import Pagination from "@/components/Pagination";
import RoleFilter from "@/components/RoleFilter";
import { buttonVariants } from "@/components/ui/button";
import { Role, User } from "@prisma/client";
import DataTable from "./DataTable";
import Link from "next/link";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

export interface SearchParams {
  role: Role;
  page: string;
  orderBy: keyof User;
}

const UsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin Access Required.</p>;
  }

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const skip = (page - 1) * pageSize;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "name";

  const roles = Object.values(Role);
  const role = roles.includes(searchParams.role)
    ? searchParams.role
    : undefined;

  let where = {};

  if (role) {
    where = { role };
  }

  const users = await prisma.user.findMany({
    where,
    orderBy: {
      [orderBy]: "desc",
    },
    take: pageSize,
    skip,
  });

  const userCount = await prisma.user.count({ where });

  return (
    <div className="w-full mt-5">
      <div className="flex flex-row mb-4 gap-4 justify-between">
        <RoleFilter />

        <Link
          href="/users/new"
          className={buttonVariants({ variant: "default" })}
        >
          New User
        </Link>
      </div>

      <>
        {userCount > 0 ? (
          <div className="rounded-md sm:border">
            <DataTable users={users} searchParams={searchParams} />
          </div>
        ) : (
          <p>No result match that query</p>
        )}
      </>
      <Pagination
        itemCount={userCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default UsersPage;
