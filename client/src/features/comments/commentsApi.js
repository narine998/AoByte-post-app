import api from "../../api/api";
import { sendRefresh } from "../../helpers";

export const getComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const sendNewComment = async (comment) => {
  const { postId } = comment;
  try {
    const response = await api.post(`/posts/${postId}/comments`, comment);
    return response.data;
  } catch (err) {
    return sendRefresh(err, async () => await sendNewComment(comment));
  }
};

export const deleteComment = async ({ postId, authorId, commentId }) => {
  try {
    const response = api.delete(`/posts/${postId}/comments/${commentId}`, {
      data: { authorId },
    });

    return response;
  } catch (err) {
    return sendRefresh(
      err,
      async () => await deleteComment({ postId, authorId, commentId })
    );
  }
};

export const editComment = async ({ postId, commentId, authorId, comment }) => {
  try {
    const response = await api.put(`/posts/${postId}/comments/${commentId}`, {
      authorId,
      comment,
    });
    return response.data;
  } catch (err) {
    return sendRefresh(
      err,
      async () => await editComment({ postId, commentId, authorId, comment })
    );
  }
};

export const likeComment = async ({ postId, commentId }) => {
  try {
    const response = await api.post(
      `/posts/${postId}/comments/${commentId}/likes`
    );
    return response.data;
  } catch (err) {
    return sendRefresh(
      err,
      async () => await likeComment({ postId, commentId })
    );
  }
};
