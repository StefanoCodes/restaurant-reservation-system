import { type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect logic
  const url = request.nextUrl.clone();
  if (
    !user &&
    !url.pathname.startsWith("/login") &&
    !url.pathname.startsWith("/register")
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/register"))
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Ensure you return a new NextResponse
}

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
