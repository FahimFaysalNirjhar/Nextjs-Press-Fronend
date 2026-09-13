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
import React, { useActionState, useEffect } from "react";
import { loginAction } from "../_action/authActions";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      //   toast.success(state.message || "User logged in successfully";)
      toast.success(state.message || "User logged in successfully");
    }
    if (!state.success) {
      //   toast.error( state.message || "Login failed. Please try again.";)
      toast.error(state.message || "Login failed. Please try again.");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="Register">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
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
          </div>

          <Button type="submit" className="w-full">
            {pending ? "Logging in..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginForm;
