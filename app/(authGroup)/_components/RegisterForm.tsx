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
import { registerAction } from "../_action/authActions";
import { toast } from "sonner";
import Link from "next/link";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Account created successfully");
    }
    if (!state.success) {
      toast.error(state.message || "Registration failed. Please try again.");
    }
  }, [state]);

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
