// app/(publicGroup)/_components/LoginForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, PenLine, User, Loader2 } from "lucide-react";

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
    requestAnimationFrame(() => {
      formRef.current?.requestSubmit();
    });
  };

  return (
    <Card className="border-none shadow-lg sm:border sm:shadow-sm">
      <CardContent className="space-y-6 p-6 sm:p-8">
        {/* Header */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Login to your account to continue
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} action={action} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <Button type="submit" className="h-11 w-full" disabled={pending}>
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {pending ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/Register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Demo logins */}
        <div className="space-y-2 border-t pt-5">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Or try a demo account
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((account) => (
              <Button
                key={account.role}
                type="button"
                variant="outline"
                size="sm"
                disabled={pending}
                onClick={() => handleDemoLogin(account.email, account.password)}
                className="flex h-auto flex-col items-center gap-1.5 py-3"
              >
                <account.icon className="size-4" aria-hidden />
                <span className="text-xs">{account.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
