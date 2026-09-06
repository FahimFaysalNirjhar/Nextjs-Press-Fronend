"use server";

export const loginAction = async (formdata: FormData) => {
  console.log(formdata);

  const email = formdata.get("email");
  const password = formdata.get("password");
};
