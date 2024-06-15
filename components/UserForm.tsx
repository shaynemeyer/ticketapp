"use client";

import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { UserFormData, userSchema } from "@/ValidationSchemas/user";

const apiUrl = "/api/users";

interface Props {
  user?: Omit<User, "password">;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function handleOnSubmit(values: UserFormData) {
    try {
      setIsSubmitting(true);
      setError("");

      if (user) {
        await axios.patch(`${apiUrl}/${user.id}`, values);
      } else {
        await axios.post(apiUrl, values);
      }

      router.push("/users");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Users Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a Username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Enter a Password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {user ? "Update User" : "Create User"}
            </Button>
            <Button
              className={buttonVariants({
                variant: "secondary",
              })}
              onClick={() => router.push("/users")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};
export default UserForm;
