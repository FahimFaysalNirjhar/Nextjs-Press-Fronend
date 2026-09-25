/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type ProfileState = {
  success: boolean;
  message: string;
  data?: Record<string, any>;
};

export const updateProfile = async (
  prevState: ProfileState,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    bio: formData.get("bio") || null,
    profilePhoto: formData.get("profilePhoto") || null,
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in." };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/my-profile`,
      {
        method: "PUT",
        headers: {
          cookie: `accessToken=${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();
    if (result.success) {
      revalidateTag("my-profile", {
        expire: 0,
      });
    }

    return result;
  } catch (error) {
    console.error("Update profile failed:", error);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
};
