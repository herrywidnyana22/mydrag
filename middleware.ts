import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 

export default authMiddleware({
  publicRoutes:["/"],
  afterAuth(auth, req){
    if(auth.userId && auth.isPublicRoute){
      let route = "/org-list"

      if(auth.orgId){
        route = `/organization/${auth.orgId}`
      }

      const orgSelectedURL = new URL(route, req.url)
      return NextResponse.redirect(orgSelectedURL)
    }

    if(!auth.userId && !auth.isPublicRoute){
      return redirectToSignIn({
        returnBackUrl: req.url
      })
    }

    if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-list"){
      const route = "/org-list"
      const orgSelectedURL = new URL(route, req.url)

      return NextResponse.redirect(orgSelectedURL)
    }

    // cek jika user akses direct "/organization" route
    if(auth.userId && auth.orgId && req.nextUrl.pathname === "/organization"){
      const route = `/organization/${auth.orgId}`
      const orgSelectedURL = new URL(route, req.url)

      return NextResponse.redirect(orgSelectedURL)
    }
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 