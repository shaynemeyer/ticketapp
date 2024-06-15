import options from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin Access Required.</p>;
  }

  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    return <p className="text-destructive">User not found!</p>;
  }

  return <UserForm user={user} />;
};

export default EditUserPage;
