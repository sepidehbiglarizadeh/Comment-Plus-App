import { FaRegTrashAlt, FaRegEdit, FaRegCommentDots } from "react-icons/fa";
import styles from "./CommentComponent.module.css";
import male from "./../../assets/images/male.png";
import female from "./../../assets/images/female.png";
import moment from "moment";
import { Link } from "react-router-dom";
import getRandomAvatar from "./../../utils/getRandomAvatar";

const avatars = [male, female];

const CommentComponent = ({
  comment,
  deleteCommentHandler,
  replies,
  style,
}) => {
  return (
    <>
      <div className={style}>
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
            <button>
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
      {replies.length > 0
        ? replies.map((reply) => {
            return (
              <CommentComponent
                key={reply.id}
                comment={reply}
                deleteCommentHandler={deleteCommentHandler}
                replies={[]}
                style={styles.reply}
              />
            );
          })
        : ""}
    </>
  );
};

export default CommentComponent;
