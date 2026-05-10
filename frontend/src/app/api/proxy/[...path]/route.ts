import { NextRequest, NextResponse } from "next/server";

const BACKEND =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  // Build the upstream URL, preserving query string
  const targetUrl = new URL("/" + path.join("/"), BACKEND);
  req.nextUrl.searchParams.forEach((v, k) => targetUrl.searchParams.set(k, v));

  // Forward only the headers that matter
  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const hasBody = !["GET", "HEAD"].includes(req.method);

  const upstream = await fetch(targetUrl.toString(), {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined,
    // needed for streaming request bodies in Node.js
    ...(hasBody ? { duplex: "half" } : {}),
  } as RequestInit);

  // Forward all response headers, especially Set-Cookie
  const resHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (["transfer-encoding", "connection"].includes(key.toLowerCase())) return;
    resHeaders.append(key, value);
  });

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
