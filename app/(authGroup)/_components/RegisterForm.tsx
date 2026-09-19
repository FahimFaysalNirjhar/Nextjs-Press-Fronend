"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { registerAction } from "../_actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, UserRound } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Account created successfully");
      router.push("Login");
    }
    if (!state.success) {
      toast.error(state.message || "Registration failed. Please try again.");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
          <CardAction>
            <Button variant="link" type="button">
              <Link href="Login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Role selection */}
          <div className="space-y-2">
            <Label>I am registering as</Label>
            <RadioGroup
              name="role"
              defaultValue="USER"
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="role-user"
                className="flex items-center gap-2 rounded-md border p-3 cursor-pointer has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
              >
                <RadioGroupItem value="USER" id="role-user" />
                <span className="text-sm font-normal">User</span>
              </Label>
              <Label
                htmlFor="role-author"
                className="flex items-center gap-2 rounded-md border p-3 cursor-pointer has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
              >
                <RadioGroupItem value="AUTHOR" id="role-author" />
                <span className="text-sm font-normal">Author</span>
              </Label>
            </RadioGroup>
            {state && "errors" in state && state.errors?.role && (
              <p className="text-sm text-red-500">{state.errors.role}</p>
            )}
          </div>
          <div className="flex flex-col  gap-1">
            <label
              htmlFor="avatar"
              className="relative h-14 w-14 cursor-pointer"
            >
              <Avatar className="h-14 w-14 border">
                <AvatarFallback className="bg-muted">
                  <UserRound className="h-6 w-6 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>

              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                <Plus className="h-3 w-3" />
              </span>

              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                required
                className="absolute h-px w-px overflow-hidden opacity-0"
              />
            </label>

            {state && "errors" in state && state.errors?.avatar && (
              <p className="text-sm text-red-500">{state.errors.avatar}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
            />
            {state && state.errors?.password && (
              <p className="text-sm text-red-500">{state.errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              required
            />
            {state && state.errors?.confirmPassword && (
              <p className="text-sm text-red-500">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {pending ? "Creating account..." : "Register"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default RegisterForm;
