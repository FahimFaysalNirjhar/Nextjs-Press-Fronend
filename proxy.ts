import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";
import { getNewRefreshToken } from "./service/refreshToken";
import { getSubscriptionStatus } from "./app/(publicGroup)/_actions/getSubscriptionStatus";

const AUTH_ROUTE = ["/login", "/register"]; // lowercase, used for comparison
const PUBLIC_ROUTE = ["/", "/news"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const normalizedPath = pathname.toLowerCase();

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewRefreshToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;

  const isAuthRoute = AUTH_ROUTE.includes(normalizedPath);
  const isPublicRoute = PUBLIC_ROUTE.some(
    (route) =>
      normalizedPath === route || normalizedPath.startsWith(route + "/"),
  );

  // Catch stray lowercase /login or /register and bounce to the real capitalized page
  if (normalizedPath === "/login" && pathname !== "/Login") {
    const url = new URL("/Login", request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }
  if (normalizedPath === "/register" && pathname !== "/Register") {
    const url = new URL("/Register", request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
    // return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (accessToken && isAuthRoute) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/Login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname === "/premium") {
    const subscriptionStatus = await getSubscriptionStatus();

    const isSubscribed = Boolean(
      subscriptionStatus?.success && subscriptionStatus.data.isSubscribed,
    );

    if (!isSubscribed) {
      return NextResponse.redirect(new URL("/payment", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
