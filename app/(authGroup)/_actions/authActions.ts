"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

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
  // console.log(formdata);
  // console.log(prevState);

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

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    // console.log(decodedToken, "decodedToken");

    if (decodedToken.role === "USER") {
      redirect("/dashboard");
    } else if (decodedToken.role == "AUTHOR") {
      redirect("/author-dashboard");
    }
  }

  return result;
};

async function uploadImgbb(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const imgbbFormData = new FormData();
  imgbbFormData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_HOST_KEY}`,
    {
      method: "POST",
      body: imgbbFormData,
    },
  );

  const result = await res.json();

  if (!result.success) {
    console.error("imgbb upload failed", result);
    return null;
  }

  return result.data.url as string;
}

export const registerAction = async (
  prevState: RegisterState,
  formdata: FormData,
) => {
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPassword = formdata.get("confirmPassword") as string;
  const avatar = formdata.get("avatar") as File | null;
  const role = formdata.get("role") as string;

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

  if (!avatar || avatar.size === 0) {
    errors.avatar = "Please select a profile picture";
  }

  if (!role || !["USER", "AUTHOR"].includes(role)) {
    errors.role = "Please select a valid role";
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

  const photoURL = await uploadImgbb(avatar as File);

  const payload = { name, email, password, role, profilePhoto: photoURL };

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
