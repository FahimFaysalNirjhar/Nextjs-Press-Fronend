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
import React, { useActionState, useEffect, useRef, useState } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, PenLine, User } from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    role: "USER",
    label: "User",
    icon: User,
    email: "user@example.com",
    password: "123456@Qa",
  },
  {
    role: "AUTHOR",
    label: "Author",
    icon: PenLine,
    email: "author@example.com",
    password: "123456@Qa",
  },
  {
    role: "ADMIN",
    label: "Admin",
    icon: ShieldCheck,
    email: "admin@example.com",
    password: "password123",
  },
];

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "User logged in successfully");
    } else {
      toast.error(state.message || "Login failed. Please try again.");
    }
  }, [state]);

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    // wait a tick so the controlled inputs update before submitting
    requestAnimationFrame(() => {
      formRef.current?.requestSubmit();
    });
  };

  return (
    <div className="space-y-4">
      <form ref={formRef} action={action}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </form>

      <Card className="p-5">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            1-click demo logins
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2 px-0 pb-0">
          {DEMO_ACCOUNTS.map((account) => (
            <Button
              key={account.role}
              type="button"
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => handleDemoLogin(account.email, account.password)}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <account.icon className="size-4" aria-hidden />
              <span className="text-xs">{account.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
