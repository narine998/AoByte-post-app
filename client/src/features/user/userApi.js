import api from "../../api/api";
import { sendRefresh } from "../../helpers";

export const checkUser = async () => {
  try {
    const response = await api.get("/is-user-loged-in");

    return response;
  } catch (err) {
    return sendRefresh(err, async () => await checkUser());
  }
};

export const register = (userData) => api.post("/register", userData);

export const login = (userData) => api.post("/login", userData);

export const logOut = () => api.post("/logout");

export const verifyEmail = (token) => api.get(`/verify-email?token=${token}`);

export const reSendEmail = (token) => api.get(`/resend-email?token=${token}`);

export const fetchUserPosts = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/posts`);

    return response;
  } catch (err) {
    return sendRefresh(err, async () => await fetchUserPosts(userId));
  }
};

export const searchUsers = async (searchTerm) => {
  try {
    const response = await api.get(`/users/search?searchTerm=${searchTerm}`);

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
