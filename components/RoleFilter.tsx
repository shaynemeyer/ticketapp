"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const roles: { label: string; value?: string }[] = [
  { label: "User / Tech" },
  { label: "User", value: "USER" },
  { label: "Tech", value: "TECH" },
  { label: "Admin", value: "ADMIN" },
];

const RoleFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get("role") || ""}
      onValueChange={(role) => {
        const params = new URLSearchParams();
        if (role) params.set("role", role);

        const query = params.size ? `?${params.toString()}` : "0";
        router.push(`/users${query}`);
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Filter by Role..." />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {roles.map((role) => (
            <SelectItem key={role.value || "0"} value={role.value || "0"}>
              {role.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RoleFilter;
