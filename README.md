# Nextjs Press — Frontend

A role-based news/blog platform frontend built with Next.js App Router, featuring public news browsing, premium subscriptions, comments, and dedicated dashboards for users, authors, and admins.

**Live backend API**: [https://prisma-press-omega.vercel.app](https://prisma-press-omega.vercel.app)
**Backend repo**: [github.com/FahimFaysalNirjhar/Prisma-Press](https://github.com/FahimFaysalNirjhar/Prisma-Press)

## Tech Stack

- **Framework**: Next.js (App Router, Server Components, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Charts**: Recharts (via shadcn chart wrapper)
- **Notifications**: sonner (toasts)
- **Auth**: cookie-based (`accessToken` / `refreshToken`, set by server actions)

## Features

- **Public**: news feed, premium news preview, post detail pages with comments
- **Auth**: login (with role-based redirect + one-click demo logins), registration with role selection and avatar upload
- **User Dashboard**: overview stats, subscription status, own comments, author application
- **Author Dashboard**: overview stats (posts, views, comments received), own posts, comments on posts
- **Admin Dashboard**: platform-wide stats with charts, full user list, all-posts management (edit/delete), author application review, comment moderation
- **Subscriptions**: Stripe-backed premium access with a dedicated payment page

## Project Structure

```
app/
├── (publicGroup)/
│   ├── login/
│   ├── register/
│   ├── news/
│   ├── payment/
│   ├── _actions/
│   │   └── authActions.ts
│   └── _components/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── (dashboardGroup)/
│   ├── dashboard/                 # USER
│   │   ├── page.tsx
│   │   ├── apply/                 # become-an-author
│   │   ├── comments/
│   │   └── subscription/
│   ├── author-dashboard/          # AUTHOR
│   │   ├── page.tsx
│   │   ├── my-posts/
│   │   └── comments/
│   ├── admin-dashboard/           # ADMIN
│   │   ├── page.tsx                # stats overview
│   │   ├── users/
│   │   ├── applications/
│   │   ├── posts/
│   │   ├── comments/
│   │   └── subscriptions/
│   ├── _actions/
│   │   ├── commentActions.ts
│   │   ├── authorRequestActions.ts
│   │   ├── postActions.ts
│   │   └── statsActions.ts
│   └── _components/
│       └── dashboard/
│           └── SubscriptionStatusCard.tsx
components/
└── ui/                             # shadcn components
lib/
└── navByRole.ts                    # role-based sidebar navigation config
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL="https://prisma-press-omega.vercel.app"
IMAGE_HOST_KEY="your-imgbb-api-key"
```

For local backend development, point this at your local server instead, e.g. `http://localhost:5000`.

## Getting Started

```bash
# install dependencies
npm install

# add required shadcn components
npx shadcn@latest add card button input label dialog select checkbox radio-group avatar chart

# start dev server
npm run dev
```

The app runs at `http://localhost:3000` by default and expects the backend API running at the URL set in `BACKEND_API_URL`.

## Key Patterns Used

### Server Actions + `authFetch`

All authenticated data fetching goes through a shared `authFetch` helper inside each `_actions` file — reads the `accessToken` cookie, attaches it, and normalizes error handling:

```ts
async function authFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return { success: false, message: "User not logged in." };
  // ...fetch + JSON parse with try/catch
}
```

### Suspense for cookie-dependent data

Any Server Component that reads cookies (directly or via `authFetch`) is wrapped in `<Suspense>` so the static shell of a page can stream instantly while the dynamic, per-user data loads separately — avoiding the Next.js "uncached data during navigation" warning.

### Role-based navigation

`navByRole` in `lib/navByRole.ts` maps each role (`USER` / `AUTHOR` / `ADMIN`) to its own sidebar nav array, consumed by the dashboard layout to render the correct links per logged-in role.

### Mutations

Form-bound mutations (create/update via a form submit) use `useActionState`. Button-triggered mutations (approve/reject, delete) use `useTransition` + `router.refresh()` to re-fetch server data after the action completes.

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm start        # run production build
npm run lint     # run ESLint
```

## Known Issues / TODO

- Pagination not yet added to admin users/posts tables
- Query-string filters (role, search) built on `getAllUsers`/`getAllPosts` actions but no filter UI wired up yet
- Full-content post editing (beyond title/status/flags) not yet built — currently limited to a quick-edit dialog

## Author

**Fahim Faysal Nirjhar** — Full Stack Developer

- GitHub: [github.com/FahimFaysalNirjhar](https://github.com/FahimFaysalNirjhar)
- Email: [fahimfaysal1995@gmail.com](mailto:fahimfaysal1995@gmail.com)
