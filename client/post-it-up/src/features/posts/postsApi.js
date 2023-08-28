import api from "../../api/api";

export const fetchPosts = ({ page }) => api.get(`/posts?page=${page}`);

export const addPost = (postData) => {
  const { title, description, image, category } = postData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  if (image) {
    formData.append("image", image);
  }
  return api.post("/posts", formData);
};

export const update = (postId, updateData) => {
  const { title, description, image, category } = updateData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  if (image) {
    formData.append("image", image);
  }
  return api.put(`/posts/${postId}`, formData);
};

export const updatePrivacy = (postId, privacy) => {
  return api.put(`/posts/${postId}`, privacy);
};

export const deletePost = (postId) => api.delete(`/posts/${postId}`);

export const addComment = (postId, comment) => {
  return api.post(`/posts/${postId}/comments`, comment);
};

export const deleteComment = (postId, commentId) => {
  return api.delete(`/posts/${postId}/comments/${commentId}`);
};

export const replyComment = (postId, commentId, replyData) => {
  return api.post(`/posts/${postId}/comments/${commentId}`, replyData);
};
