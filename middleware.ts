import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { UseUser } from "@/context/AppContext";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { setUser } = UseUser();

  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  let user = await supabase.auth.getUser();

  setUser(user);

  if(!user && !req.url.includes("/user/login") && !req.url.includes("/user/signup")){
    return NextResponse.redirect(new URL('/user/login', req.url))
  }

  return res;
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    "/tracker"
  ],
}