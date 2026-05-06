import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const tokenService = {
  sign(user) {
    return jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
  },

  verify(token) {
    return jwt.verify(token, env.jwtSecret);
  },
};
