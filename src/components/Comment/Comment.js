import { FaRegTrashAlt, FaRegEdit, FaRegCommentDots } from "react-icons/fa";
import styles from "./Comment.module.css";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import moment from "moment";
import { Link } from "react-router-dom";
import getRandomAvatar from "../../utils/getRandomAvatar";
import ReplyForm from "../ReplyForm/ReplyForm";

const avatars = [male, female];

const Comment = ({
  comment,
  deleteCommentHandler,
  replies,
  setComments,
  selectedCommentId,
  setSelectedCommentId,
  addReplyHandler,
  parentId = null,
}) => {
  const replyId = parentId ? parentId : comment.id;

  return (
    <>
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
            <button onClick={() => setSelectedCommentId(comment.id)}>
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
      {selectedCommentId === comment.id && (
        <ReplyForm
          setSelectedCommentId={setSelectedCommentId}
          replyId={replyId}
          setComments={setComments}
          addReplyHandler={addReplyHandler}
        />
      )}
      {replies.length > 0 && (
        <div className={styles.reply}>
          {replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                deleteCommentHandler={deleteCommentHandler}
                replies={[]}
                selectedCommentId={selectedCommentId}
                setSelectedCommentId={setSelectedCommentId}
                addReplyHandler={addReplyHandler}
                setComments={setComments}
                parentId={comment.id}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Comment;
