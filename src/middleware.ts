import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { userRole } from "./constants/role";
import { IUserInfo } from "./interfaces/global";
import { decodedToken } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const cookie = request.cookies.get(process.env.TOKEN as string);
  const token = cookie?.value;

  const userRoutes = [
    "/dashboard/user/bookings",
    "/dashboard/user/review/*",
    "/dashboard/user/feedback",
  ];

  const adminRoutes = [
    "/dashboard/admin/users",
    "/dashboard/admin/users/add-user",
    "/dashboard/admin/events",
    "/dashboard/admin/events/add",
    "/dashboard/admin/events/categories",
    "/dashboard/admin/events/categories/add",
    "/dashboard/admin/bookings",
    "/dashboard/admin/bookings/summary",
    "/dashboard/admin/blogs",
    "/dashboard/admin/blogs/add",
    "/dashboard/admin/faq",
    "/dashboard/admin/faq/add",
    "/dashboard/admin/feedbacks",
    "/dashboard/admin/pages",
    "/dashboard/admin/pages/add",
  ];

  const superAdminRoutes = [
    ...adminRoutes,
    "/dashboard/super-admin/admins",
    "/dashboard/super-admin/add-admin",
  ];

  if (token) {
    const user = decodedToken(token as string) as IUserInfo;

    url.pathname = "/not-found";

    if (pathname === "/dashboard") {
      return NextResponse.next();
    }

    // if user role is not admin and user is trying to access admin routes then redirect to login page
    if (
      user?.role === userRole.USER &&
      (adminRoutes.includes(pathname) || superAdminRoutes.includes(pathname))
    ) {
      return NextResponse.redirect(url);
    }

    // if admin is trying to access user routes or super admin routes then redirect to login page
    if (user?.role === userRole.ADMIN && userRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }

    // if super-admin is trying to access user routes or admin routes then redirect to login page
    if (user?.role === userRole.SUPER_ADMIN && userRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }

    // if user, admin, or super-admin is trying to access their own routes then allow
    if (
      (user?.role === userRole.USER && userRoutes.includes(pathname)) ||
      (user?.role === userRole.ADMIN && adminRoutes.includes(pathname)) ||
      (user?.role === userRole.SUPER_ADMIN &&
        superAdminRoutes.includes(pathname))
    ) {
      return NextResponse.next();
    }
  } else {
    url.pathname = "/signin";
    if (
      adminRoutes.includes(pathname) ||
      superAdminRoutes.includes(pathname) ||
      userRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(url);
    }
  }
}
