import api from "../../api/api";

import { sendRefresh } from "../../helpers";

export const fetchPosts = (queryParams) => {
  const url = new URL(`${process.env.REACT_APP_BASE_URL}/posts`);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  return api.get(url);
};

export const addPost = async (postData) => {
  const { title, description, image, category } = postData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);

  if (image) {
    formData.append("image", image);
  }
  try {
    const response = await api.post("/posts", formData);

    return response;
  } catch (err) {
    return sendRefresh(err, async () => await addPost(postData));
  }
};

export const update = async (postId, updateData) => {
  const { title, description, image, category, authorId } = updateData;
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("authorId", authorId);

  if (image) {
    formData.append("image", image);
  }

  try {
    const response = await api.put(`/posts/${postId}`, formData);

    return response;
  } catch (err) {
    return sendRefresh(err, async () => await update(postId, updateData));
  }
};

export const updatePrivacy = async (postId, privacy) => {
  try {
    const response = await api.put(`/posts/${postId}`, privacy);

    return response;
  } catch (err) {
    return sendRefresh(err, async () => await updatePrivacy(postId, privacy));
  }
};

export const deletePost = async ({ postId, authorId }) => {
  try {
    const response = await api.delete(`/posts/${postId}`, {
      data: { authorId },
    });

    return response;
  } catch (err) {
    return sendRefresh(err, async () => await deletePost({ postId, authorId }));
  }
};

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/likes`);

    return response.data;
  } catch (err) {
    return sendRefresh(err, async () => await likePost(postId));
  }
};

export const ratePost = async (postId, rate) => {
  try {
    const response = await api.post(`/posts/${postId}/rating`, { rate });

    return response.data;
  } catch (err) {
    return sendRefresh(err, async () => await ratePost(postId, rate));
  }
};

export const getLikedUsers = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/likes`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const searchPosts = async (title) => {
  try {
    const response = await api.post(`/posts/search`, { title });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePost = async ({ postId, userId }) => {
  try {
    const response = await api.get(`/posts/${postId}?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
