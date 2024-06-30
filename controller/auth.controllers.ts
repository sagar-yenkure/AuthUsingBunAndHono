import type { Context } from "hono";
import prisma from "../prisma/prisma";
import bcryptPassword from "../utilities/bcryptPassword";

export const register = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "email and password are required" }, 400);
    }

    // Checking if user already exists
    const isUserAlreadyExist = await prisma.user.findUnique({
      where: { email: email },
    });
    if (isUserAlreadyExist) {
      return c.json({ error: "user already exists, please login" }, 409);
    }

    // Hashing password and creating new user
    const hashedPassword = await bcryptPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return c.json({ message: "User registered successfully" }, 201);
  } catch (error: any) {
    console.error("Error - ", error.message);
    return c.json({ error: "Server side error, please try again" }, 500);
  }
};
