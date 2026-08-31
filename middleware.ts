import { NextRequest, NextResponse } from "next/server";
export function middleware(req:NextRequest){const password=process.env.ADMIN_PASSWORD;if(!password)return new NextResponse("Admin is not configured.",{status:503});const auth=req.headers.get("authorization");if(auth){const [scheme,encoded]=auth.split(" ");if(scheme==="Basic"){const [,pass]=atob(encoded).split(":");if(pass===password)return NextResponse.next()}}return new NextResponse("Authentication required",{status:401,headers:{"WWW-Authenticate":'Basic realm="Timeless Admin"'}})}
export const config={matcher:["/admin/:path*"]};
