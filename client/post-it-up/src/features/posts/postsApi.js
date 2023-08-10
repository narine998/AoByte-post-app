import api from "../../api/api";
import { v4 as uuidv4 } from "uuid";

export const fetchPosts = () => api.get("/posts");

export const addPost = (postData) => {
  const { title, description, imageFile } = postData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (imageFile) {
    formData.append("image", imageFile);
  }
  return api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePost = (postId) => {
  return api.delete(`/posts/${postId}`);
};

export const addComment = (postId, comment) => {
  return api.post(`/posts/${postId}/comments`, comment);
};

export const deleteComment = (postId, commentId) => {
  return api.delete(`/posts/${postId}/comments/${commentId}`);
};

export const replyComment = (postId, commentId, replyData) => {
  return api.post(`/posts/${postId}/comments/${commentId}`, replyData);
};
