import { Hono } from "hono";
import auth from "./routes/auth.routes";
import { logger } from "hono/logger";

const APP = new Hono();
APP.use(logger());

const server = Bun.serve({
  port: process.env.HOST || 3001,
  fetch: APP.fetch,
});

// http://localhost:3000/api/auth/register

APP.route("/api/auth", auth);

console.log(`The server is running on port ${server.port}`);
