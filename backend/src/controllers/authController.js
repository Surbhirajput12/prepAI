import bcrypt from "bcrypt";
import { store } from "../repositories/mongoStore.js";
import { oauthService } from "../services/oauthService.js";
import { tokenService } from "../services/tokenService.js";
import { ApiError } from "../utils/apiError.js";

function authResponse(user) {
  const token = tokenService.sign(user);
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider,
    },
    redirectTo: "/dashboard",
  };
}

export const authController = {
  async signup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, "name, email, and password are required.");
    }

    const existingUser = await store.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(409, "Account already exists. Please login.");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await store.createUser({ email, name, passwordHash, provider: "local" });

    res.status(201).json({
      success: true,
      message: "Signup successful.",
      data: authResponse(user),
    });
  },

  async login(req, res) {
  
  const { email, password } = req.body;

  

  if (!email || !password) {
    throw new ApiError(400, "email and password are required.");
  }

  

  const user = await store.findUserByEmail(email);


  if (!user || !user.passwordHash) {
    throw new ApiError(401, "Invalid email or password.");
  }

  

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  res.json({
    success: true,
    message: "Login successful.",
    data: authResponse(user),
  });

},

async googleOauth(req, res) {
    const { idToken } = req.body;
    if (!idToken) {
      throw new ApiError(400, "idToken is required.");
    }

    const profile = await oauthService.verifyGoogleIdToken(idToken);

    let user = await store.findUserByOAuth("google", profile.providerId);
    if (!user) {
      user = await store.findUserByEmail(profile.email);
    }
    if (!user) {
      user = await store.createUser({
        email: profile.email,
        name: profile.name,
        provider: "google",
        providerId: profile.providerId,
      });
    }

    res.json({
      success: true,
      message: "Google OAuth login successful.",
      data: authResponse(user),
    });
  },

  async me(req, res) {
    res.json({
      success: true,
      isLoggedIn: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        provider: req.user.provider,
      },
    });
  },
};
