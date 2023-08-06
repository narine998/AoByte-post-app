import api from "../../api/api";
import posts from "../../data";
import { v4 as uuidv4 } from "uuid";

// export const fetchPosts = () => api.get("/posts");

export const fetchPosts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: posts }), 500);
  });
};

export const addPost = (postData) => {
  // const { title, description, imageFile } = postData;
  // const formData = new FormData();
  // formData.append("title", title);
  // formData.append("description", description);
  // formData.append("image", imageFile);
  return new Promise((res, rej) =>
    setTimeout(() => {
      res({ data: { ...postData, id: uuidv4(), comments: [] } }, 500);
    })
  );
};

export const addComment = (postId, comment) => {
  return new Promise((res, rej) =>
    setTimeout(
      () => res({ data: { ...comment, id: uuidv4(), replies: [] } }),
      500
    )
  );
  // return api.post(`/posts/${postId}/comments`, commentData);
};

export const deleteComment = (postId, commentId) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("deleted");
    }, 500);
  });
  // return api.delete(`/posts/${postId}/comments/${commentId}`);
};

export const replyComment = (postId, commentId, replyData) => {
  // return api.post(`/posts/${postId}/comments/${commentId}`, replyData);
  return new Promise((res, rej) => {
    setTimeout(() => res({ data: replyData }), 500);
  });
};
