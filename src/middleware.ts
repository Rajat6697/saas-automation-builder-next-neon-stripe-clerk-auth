import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Define protected routes
// const isProtectedRoute = createRouteMatcher([
//   "/api/auth/callback/discord",
//   "/api/auth/callback/notion",
//   "/api/auth/callback/slack",
//   "/api/flow",
//   "/api/cron/wait(.*)",
// ]);

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/api/clerk-webhook",
  "/api/drive-activity/notification",
]);

// Define ignored routes
const isIgnoredRoute = createRouteMatcher([
  "/api/auth/callback/discord",
  "/api/auth/callback/notion",
  "/api/auth/callback/slack",
  "/api/flow",
  "/api/cron/wait",
]);

export default clerkMiddleware((auth, req) => {

    // If the route is in the ignored routes, do nothing
    if (isIgnoredRoute(req)) {
      console.log("Ignored route accessed:", req.url);
      return;  // Exit the middleware early
    }
  

  // Check if the route is protected
  // if (isProtectedRoute(req)) {
  //   console.log("Protected route accessed:", req.url);
  //   auth().protect();
  // }

  // If it's not a public route, protect it as well
  if (!isPublicRoute(req)) {
    console.log("Non-public route accessed:", req.url);
    auth().protect();
  }
});

// Middleware configuration
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all paths except for static files and Next.js internal paths
    "/", 
    "/(api|trpc)(.*)"
  ],
};