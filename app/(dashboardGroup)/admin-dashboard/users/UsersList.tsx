/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboardGroup)/admin-dashboard/users/UsersList.tsx
import { getAllUsers } from "../../_actions/userActions";
import { Users as UsersIcon } from "lucide-react";

type Props = {
  searchParams: Promise<{ role?: string; searchTerm?: string }>;
};

const roleBadgeStyles: Record<string, string> = {
  ADMIN: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  AUTHOR: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  USER: "bg-muted text-muted-foreground border-border",
};

export async function UsersList({ searchParams }: Props) {
  const { role, searchTerm } = await searchParams;
  const result = await getAllUsers({ role, searchTerm });

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load users</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const users = Array.isArray(result.data?.users) ? result.data.users : [];

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <UsersIcon
          className="mx-auto mb-2 size-6 text-muted-foreground"
          aria-hidden
        />
        <p className="font-medium">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => {
            const joined = new Date(user.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            );

            return (
              <tr key={user.id} className="border-b last:border-b-0">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      roleBadgeStyles[user.role] ?? roleBadgeStyles.USER
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{joined}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
