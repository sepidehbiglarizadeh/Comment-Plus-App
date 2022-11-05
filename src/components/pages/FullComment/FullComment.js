import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getOneCommentService from "../../../services/getOneCommentService";
import styles from "./FullComment.module.css";
import { ThreeDots } from "react-loader-spinner";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";
import getRandomAvatar from "../../../utils/getRandomAvatar";
import { FaRegTrashAlt } from "react-icons/fa";
import deleteCommentService from "../../../services/deleteCommentService";
import getAllCommentsService from "../../../services/getAllCommentsService";

const avatars = [male, female];

const FullCommentPage = () => {
  const [comment, setComment] = useState([]);
  const [replies, setReplies] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getReplies = async () => {
      try {
        const { data } = await getAllCommentsService();
        setReplies(data.filter((d) => d.parentId === parseInt(id)));
      } catch (error) {
        console.log(error);
      }
    };
    getReplies();
  }, [comment]);

  useEffect(() => {
    if (id) {
      getOneCommentService(id)
        .then((res) => setComment(res.data))
        .catch();
    }
  }, [id]);

  const deleteCommentHandler = async () => {
    try {
      await deleteCommentService(id);
      navigate("/");
      setComment(null);
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
          name={comment.name}
          createdAt={comment.createdAt}
          email={comment.email}
          body={comment.body}
          deleteCommentHandler={deleteCommentHandler}
        />
      );
    }

    return renderValue;
  };

  const renderReplies = () => {
    let renderValue;
    if (replies) {
      renderValue = replies.map((reply) => {
        return (
          <CommentComponent
            key={reply.id}
            name={reply.name}
            createdAt={reply.createdAt}
            email={reply.email}
            body={reply.body}
            deleteCommentHandler={deleteCommentHandler}
          />
        );
      });
    }

    return renderValue;
  };

  return (
    <section className={styles.fullComment}>
      {renderFullComment()}
      <div className={styles.replies}>{renderReplies()}</div>
    </section>
  );
};

export default FullCommentPage;

const CommentComponent = ({
  name,
  body,
  createdAt,
  email,
  deleteCommentHandler,
}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.imgWrapper}>
        <img src={getRandomAvatar(avatars)} alt="avatar" />
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <div>{name}</div>
          <span>. {createdAt}</span>
        </div>
        <div className={styles.email}>Email : {email}</div>
        <p>{body}</p>
        <div className={styles.btnsWrapper}>
          <button className={styles.deleteBtn} onClick={deleteCommentHandler}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};
