import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();

  // If user is not authenticated and not on a public route 
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If user is authenticated but does not have an organization
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  // If user is authenticated and on a public route
  if (userId && isPublicRoute(req)) {
    const path = orgId ? `/organization/${orgId}` : "/select-org";
    return NextResponse.redirect(new URL(path, req.url));
  }

  // Allow access for all other cases
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};