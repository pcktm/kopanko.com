import type { RequestContext } from "@vercel/edge";

export const config = {
  runtime: "edge",
};

export function GET(request: Request, context: RequestContext) {
  console.log("Region:", process.env.VERCEL_REGION);
  console.log("Deployment URL:", process.env.VERCEL_URL);
  return new Response(
    `Hello from ${process.env.VERCEL_REGION}, ${process.env.VERCEL_URL}`,
  );
}
