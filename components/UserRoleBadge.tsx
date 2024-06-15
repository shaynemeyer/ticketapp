import { Role } from "@prisma/client";
import { Badge } from "./ui/badge";

interface Props {
  role: Role;
}

const roleMap: Record<
  Role,
  {
    label: string;
    color: "bg-emerald-400" | "bg-sky-400" | "bg-purple-400";
  }
> = {
  USER: { label: "User", color: "bg-emerald-400" },
  TECH: { label: "Tech", color: "bg-sky-400" },
  ADMIN: { label: "Admin", color: "bg-purple-400" },
};

const UserRoleBadge = ({ role }: Props) => {
  return (
    <Badge
      className={`${roleMap[role].color} text-background hover:${roleMap[role].color}`}
    >
      {roleMap[role].label}
    </Badge>
  );
};
export default UserRoleBadge;
