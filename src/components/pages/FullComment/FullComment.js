import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getOneCommentService from "../../../services/getOneCommentService";
import styles from "./FullComment.module.css";
import { ThreeDots } from "react-loader-spinner";
import deleteCommentService from "../../../services/deleteCommentService";
import getAllCommentsService from "../../../services/getAllCommentsService";
import CommentComponent from "../../CommentComponent/CommentComponent";

const FullCommentPage = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const { id } = useParams();
  let navigate = useNavigate();

  const getReplies = (commentId) => {
    return comments.filter((c) => c.parentId === commentId);
  };

  useEffect(() => {
    if (id) {
      getOneCommentService(id)
        .then((res) => setComment(res.data))
        .catch();
    }
    getAllCommentsService()
      .then((res) => setComments(res.data))
      .catch();
  }, [id]);

  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteCommentService(commentId);
      const { data } = await getAllCommentsService();
      setComments(data);
      if (commentId === parseInt(id)) {
        setComment(null);
        navigate("/");
      }
    } catch (error) {}
  };

  const renderFullComment = () => {
    let renderValue = <p>Select a Comment</p>;

    if (id) {
      renderValue = (
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
    }

    if (comment) {
      renderValue = (
        <CommentComponent
          comment={comment}
          deleteCommentHandler={deleteCommentHandler}
          setIsShow={setIsShow}
          isShow={isShow}
          replies={getReplies(comment.id)}
          style={styles.comment}
        />
      );
    }

    return renderValue;
  };

  return (
    <section className={styles.fullComment}>{renderFullComment()}</section>
  );
};

export default FullCommentPage;
