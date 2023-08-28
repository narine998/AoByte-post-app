import api from "../../api/api";

export const checkUser = () => api.get("/is-user-loged-in");

export const register = (userData) => api.post("/register", userData);

export const login = (userData) => api.post("/login", userData);

export const logOut = () => api.post("/logout");

export const verifyEmail = (token) => api.get(`/verify-email?token=${token}`);

export const reSendEmail = (token) => api.get(`/resend-email?token=${token}`);

export const fetchUserPosts = (userId) => api.get(`/users/${userId}/posts`);
