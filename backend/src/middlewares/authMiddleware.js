import { store } from "../repositories/mongoStore.js";
import { tokenService } from "../services/tokenService.js";
import { ApiError } from "../utils/apiError.js";

export const requireAuth = async (req, _res, next) => {
  const authorization = req.headers.authorization || "";
  const [, token] = authorization.split(" ");

  if (!token) {
    return next(new ApiError(401, "Authentication required."));
  }

  try {
    const payload = tokenService.verify(token);
    const user = await store.findUserById(payload.sub);
    if (!user) {
      return next(new ApiError(401, "Invalid authentication token."));
    }
    req.user = user;
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token."));
  }
};
