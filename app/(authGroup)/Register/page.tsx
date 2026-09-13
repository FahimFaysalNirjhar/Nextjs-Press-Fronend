import React from "react";
import RegisterForm from "../_components/RegisterForm";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg border">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
