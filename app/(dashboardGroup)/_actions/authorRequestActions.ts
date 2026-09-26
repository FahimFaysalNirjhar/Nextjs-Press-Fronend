// _actions/authorRequestActions.ts
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

async function authFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
      ...options,
      headers: {
        cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
        ...options.headers,
      },
    });
    return await res.json();
  } catch (error) {
    console.error(`Request failed: ${path}`, error);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
}

export const getMyAuthorRequestStatus = async () => {
  return authFetch("/api/users/author-requests/me");
};

export const submitAuthorRequest = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
) => {
  const bio = formData.get("bio");

  const result = await authFetch("/api/users/author-requests", {
    method: "POST",
    body: JSON.stringify({ bio }),
  });

  if (result.success) {
    revalidateTag("my-author-request", { expire: 0 });
  }

  return result;
};

export const getAllAuthorRequests = async (status?: string) => {
  const query = status ? `?status=${status}` : "";
  return authFetch(`/api/users/author-requests${query}`);
};

export const reviewAuthorRequest = async (
  requestId: string,
  status: "APPROVED" | "REJECTED",
) => {
  const result = await authFetch(`/api/users/author-requests/${requestId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  return result;
};
