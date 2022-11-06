import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import getOneCommentService from "../../../services/getOneCommentService";
import styles from "./FullComment.module.css";
import { ThreeDots } from "react-loader-spinner";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";
import getRandomAvatar from "../../../utils/getRandomAvatar";
import { FaRegTrashAlt, FaRegEdit, FaRegCommentDots } from "react-icons/fa";
import deleteCommentService from "../../../services/deleteCommentService";
import getAllCommentsService from "../../../services/getAllCommentsService";
import moment from "moment";
import ReplyForm from "../../ReplyForm/ReplyForm";

const avatars = [male, female];

const FullCommentPage = () => {
  const [comment, setComment] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [showComponent, setShowComponent] = useState(null);

  const { id } = useParams();
  let navigate = useNavigate();

  const getReplies = async () => {
    try {
      const { data } = await getAllCommentsService();
      setReplies(data.filter((d) => d.parentId === parseInt(id)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  useEffect(() => {
    if (id) {
      getOneCommentService(id)
        .then((res) => setComment(res.data))
        .catch();
    }
  }, [id]);

  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteCommentService(commentId);
      getReplies();
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
        <>
          <CommentComponent
            comment={comment}
            deleteCommentHandler={deleteCommentHandler}
            setIsShow={setIsShow}
            isShow={isShow}
            setShowComponent={setShowComponent}
          />
          {showComponent === comment.id ? (
            <ReplyForm
              setShowComponent={setShowComponent}
              id={comment.id}
              setReplies={setReplies}
            />
          ) : (
            ""
          )}
        </>
      );
    }

    return renderValue;
  };

  const renderReplies = () => {
    let renderValue;
    if (replies) {
      renderValue = replies.map((reply) => {
        return (
          <>
            <CommentComponent
              key={reply.id}
              comment={reply}
              deleteCommentHandler={deleteCommentHandler}
              setIsShow={setIsShow}
              isShow={isShow}
              setShowComponent={setShowComponent}
            />
            {showComponent === reply.id ? (
              <ReplyForm
                setShowComponent={setShowComponent}
                showComponent={showComponent}
                id={reply.id}
                setReplies={setReplies}
              />
            ) : (
              ""
            )}
          </>
        );
      });
    }

    return renderValue;
  };

  return (
    <section className={styles.fullComment}>
      <div>{renderFullComment()}</div>
      <div className={styles.replies}>{renderReplies()}</div>
    </section>
  );
};

export default FullCommentPage;

const CommentComponent = ({
  comment,
  deleteCommentHandler,
  setShowComponent,
}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.imgWrapper}>
        <img src={getRandomAvatar(avatars)} alt="avatar" />
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <div>{comment.name}</div>
          <span>. {moment(comment.createdAt).fromNow()}</span>
        </div>
        <div className={styles.email}>Email : {comment.email}</div>
        <p>{comment.body}</p>
        <div className={styles.btnsWrapper}>
          <button onClick={() => setShowComponent(comment.id)}>
            <FaRegCommentDots />
          </button>
          <Link to="/new-comment" state={comment}>
            <button className={styles.editBtn}>
              <FaRegEdit />
            </button>
          </Link>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteCommentHandler(comment.id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};
