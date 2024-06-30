import { Hono } from "hono";
import auth from "./routes/auth.routes";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
export const runtime = "edge";
const APP = new Hono().basePath("/api");

APP.use(logger());

export const server = Bun.serve({
  port: process.env.HOST || 3001,
  fetch: APP.fetch,
});

// http://localhost:3000/api/auth/register

APP.route("/api/auth", auth);

console.log(`The server is running on port ${server.port}`);
export const GET = handle(APP);
export const POST = handle(APP);
