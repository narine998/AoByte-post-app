import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const fetchSinglePost = (postId) => api.get(`/posts/${postId}`);

export const addPost = async (postData) => {
  const { title, description, imageFile } = postData;

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);

    const response = await api.post(`/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeComment = async (postId, commentId, likeCount) => {
  try {
    const response = await api.patch(
      `posts/${postId}/comments/${commentId}`,
      likeCount
    );
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export default api;
