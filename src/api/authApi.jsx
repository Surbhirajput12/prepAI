import API from "./axios";

export const signupUser = async (data) => {
  console.log("SIGNUP API CALLED");

  const response = await API.post("/auth/signup", data);

  console.log("SIGNUP RESPONSE:", response);

  return response.data;
};

export const loginUser = async (data) => {
  console.log("LOGIN API CALLED");

  const response = await API.post("/auth/login", data);

  console.log("LOGIN RESPONSE:", response);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");

  return response.data;
};