import api from "../../api/api";
import { sendRefresh } from "../../helpers";

export const getReplies = async ({ postId, commentId }) => {
  try {
    const response = await api.get(
      `/posts/${postId}/comments/${commentId}/replies`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const replyComment = async ({ postId, commentId, replyData }) => {
  try {
    const response = await api.post(
      `/posts/${postId}/comments/${commentId}/replies`,
      {
        replyData,
      }
    );

    return response.data;
  } catch (err) {
    return sendRefresh(
      err,
      async () => await replyComment({ postId, commentId, replyData })
    );
  }
};

export const deleteReply = async ({ postId, commentId, replyId, authorId }) => {
  try {
    const response = await api.delete(
      `/posts/${postId}/comments/${commentId}/replies/${replyId}`,
      { data: { authorId } }
    );

    return response.data;
  } catch (err) {
    return sendRefresh(
      err,
      async () => await deleteReply({ postId, commentId, replyId, authorId })
    );
  }
};
