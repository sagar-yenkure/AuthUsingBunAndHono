import { Hono } from "hono";
import { login, register } from "../controller/auth.controllers";

const auth = new Hono();

auth.post("/register", register);

auth.post("/login", login);

export default auth;
