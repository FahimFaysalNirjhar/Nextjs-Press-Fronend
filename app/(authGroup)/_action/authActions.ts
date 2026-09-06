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
