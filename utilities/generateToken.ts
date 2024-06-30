import { sign } from "hono/jwt";

const generateToken = async (_id: any) => {
  const payload = { _id, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
  const token = await sign(payload, process.env.JWT_TOKEN || "");
  return token;
};

export default generateToken;
