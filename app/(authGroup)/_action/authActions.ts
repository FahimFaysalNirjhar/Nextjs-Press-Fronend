"use server";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: "User logged in successfully";
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

type RegisterSuccessState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
      };
    };
  };
};

type RegisterApiErrorState = {
  success: false;
  statusCode: number;
  name: string;
  message: string;
  error: string;
};

type RegisterValidationErrorState = {
  success: false;
  statusCode: 400;
  message: string;
  errors: Record<string, string>;
};

export type RegisterState =
  | RegisterSuccessState
  | RegisterApiErrorState
  | RegisterValidationErrorState
  | null;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

export const loginAction = async (
  prevState: LoginState,
  formdata: FormData,
) => {
  console.log(formdata);
  console.log(prevState);

  const email = formdata.get("email");
  const password = formdata.get("password");
  const payload = { email, password };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log(result);
  return result;
};

export const registerAction = async (
  prevState: RegisterState,
  formdata: FormData,
) => {
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPassword = formdata.get("confirmPassword") as string;
  const payload = { name, email, password };

  const errors: Record<string, string> = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!PASSWORD_REGEX.test(password)) {
    errors.password =
      "Password must be at least 6 characters and include one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // 🔴 THIS WAS MISSING — stop here if validation failed
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      statusCode: 400,
      message: "Please fix the errors below",
      errors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return result;
};
