import React from "react";
import LoginForm from "../_components/LoginForm";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg border">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
