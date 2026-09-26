// app/(publicGroup)/_components/RegisterForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { registerAction } from "../_actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, UserRound, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Account created successfully");
      router.push("/login");
    } else {
      toast.error(state.message || "Registration failed. Please try again.");
    }
  }, [state, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const fieldErrors = state && "errors" in state ? state.errors : undefined;

  return (
    <Card className="border-none shadow-lg sm:border sm:shadow-sm">
      <CardContent className="space-y-6 p-6 sm:p-8">
        {/* Header */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to get started
          </p>
        </div>

        <form action={action} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-1.5">
            <label
              htmlFor="avatar"
              className="relative h-16 w-16 cursor-pointer"
            >
              <Avatar className="h-16 w-16 border">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Avatar preview" />
                ) : (
                  <AvatarFallback className="bg-muted">
                    <UserRound className="h-6 w-6 text-muted-foreground" />
                  </AvatarFallback>
                )}
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
                onChange={handleAvatarChange}
                className="absolute h-px w-px overflow-hidden opacity-0"
              />
            </label>

            {fieldErrors?.avatar && (
              <p className="text-xs text-destructive">{fieldErrors.avatar}</p>
            )}
          </div>

          {/* Role selection */}
          <div className="space-y-1.5">
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
            {fieldErrors?.role && (
              <p className="text-xs text-destructive">{fieldErrors.role}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="h-11"
            />
            {fieldErrors?.name && (
              <p className="text-xs text-destructive">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="h-11"
            />
            {fieldErrors?.email && (
              <p className="text-xs text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="h-11"
            />
            {fieldErrors?.password && (
              <p className="text-xs text-destructive">{fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              required
              className="h-11"
            />
            {fieldErrors?.confirmPassword && (
              <p className="text-xs text-destructive">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <Button type="submit" className="h-11 w-full" disabled={pending}>
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {pending ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
