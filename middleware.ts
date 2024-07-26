import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();

  const signInUrl = new URL('/sign-in', req.url);
  const selectOrgUrl = new URL('/select-org', req.url);
  const orgUrl = new URL(`/organization/${orgId}`, req.url);

  // If user is not authenticated and not on a public route, redirect to sign in
  if (!userId && !isPublicRoute(req) && req.url !== signInUrl.href) {
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated but does not have an organization, redirect to select-org
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org" && req.url !== selectOrgUrl.href) {
    return NextResponse.redirect(selectOrgUrl);
  }

  // If user is authenticated and on a public route
  if (userId && isPublicRoute(req)) {
    const path = orgId ? orgUrl : selectOrgUrl;
    if (req.url !== path.href) {
      return NextResponse.redirect(path);
    }
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
