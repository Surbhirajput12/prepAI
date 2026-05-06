import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

const googleClient = env.googleClientId ? new OAuth2Client(env.googleClientId) : null;

export const oauthService = {
  async verifyGoogleIdToken(idToken) {
    if (!googleClient) {
      throw new ApiError(
        500,
        "Google OAuth is not configured. Set GOOGLE_CLIENT_ID in your .env file."
      );
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload?.email || !payload?.sub) {
      throw new ApiError(401, "Invalid Google token payload.");
    }

    return {
      email: payload.email,
      name: payload.name || payload.email.split("@")[0],
      providerId: payload.sub,
    };
  },
};
