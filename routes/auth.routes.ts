import { Hono } from "hono";
import { register } from "../controller/auth.controllers";

const auth = new Hono();

auth.post("/register", register);

export default auth;
