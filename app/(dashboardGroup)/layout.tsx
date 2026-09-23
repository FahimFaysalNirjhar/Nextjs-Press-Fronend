import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const DashboardGroupLayout = async ({
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
    </div>
  );
};

export default DashboardGroupLayout;
