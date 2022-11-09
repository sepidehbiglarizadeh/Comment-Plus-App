import { useEffect, useState } from "react";
import getAllCommentsService from "../../services/getAllCommentsService";
import { ThreeDots } from "react-loader-spinner";
import styles from "../CommentsList/CommentsList.module.css";
import deleteCommentService from "../../services/deleteCommentService";
import Comment from "../Comment/Comment";

const Commentslist = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const rootComments = comments.filter((comment) => comment.parentId === null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await getAllCommentsService();
        setComments(data);
      } catch (error) {
        setError(true);
      }
    };
    getComments();
  }, []);

  const getReplies = (commentId) => {
    return comments.filter((c) => c.parentId === commentId);
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteCommentService(commentId);
      const { data } = await getAllCommentsService();
      setComments(data);
    } catch (error) {}
  };

  const renderComments = () => {
    let renderValue = (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#a5b4fc"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );

    if (error) {
      renderValue = <p style={{ margin: "0 auto" }}>Fetching Data Failed</p>;
    }

    if (comments.length && !error) {
      renderValue = rootComments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            deleteCommentHandler={deleteCommentHandler}
            replies={getReplies(comment.id)}
            style={styles.comment}
            setComments={setComments}
            selectedCommentId={selectedCommentId}
            setSelectedCommentId={setSelectedCommentId}
            comments={comments}
          />
        );
      });
    }

    return renderValue;
  };

  return <section className={styles.commentsList}>{renderComments()}</section>;
};

export default Commentslist;
