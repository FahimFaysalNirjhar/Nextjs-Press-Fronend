import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const result = await getMe();
  const user = result.success ? result.data.profile : null;
  return (
    <div>
      <Navbar user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default PublicGroupLayout;
