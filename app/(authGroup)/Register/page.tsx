import React from "react";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import { Newspaper } from "lucide-react";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <Link href="/" className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Newspaper className="size-5" aria-hidden />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Nextjs Press
          </span>
        </Link>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
