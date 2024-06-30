import type { Context } from "hono";
import prisma from "../prisma/prisma";
import bcryptPassword from "../utilities/bcryptPassword";
import generateToken from "../utilities/generateToken";
import comparePassword from "../utilities/comparePassword";

// Register controller
export const register = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Checking if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return c.json({ error: "User already exists, please login" }, 409);
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

// Login controller
export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Finding user by email
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (!userExists) {
      return c.json(
        { error: "User does not exist, please register first" },
        404
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordValid) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    const token = await generateToken(userExists.id);

    return c.json({ message: "User logged in successfully", token });
  } catch (error: any) {
    console.error("Error - ", error.message);
    return c.json({ error: "Server side error, please try again" }, 500);
  }
};
