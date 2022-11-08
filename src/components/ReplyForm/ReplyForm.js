import { useState } from "react";
import { FaTelegram, FaTimes } from "react-icons/fa";
import addNewCommentService from "../../services/addNewCommentService";
import getAllCommentsService from "../../services/getAllCommentsService";
import styles from "./ReplyForm.module.css";

const ReplyForm = ({ setSelectedCommentId, replyId, setComments }) => {
  const [reply, setReply] = useState({
    name: "",
    email: "",
    body: "",
  });

  const changeHandler = (e) => {
    setReply({ ...reply, [e.target.name]: e.target.value });
  };

  const addReplyHandler = async (e) => {
    e.preventDefault();
    try {
      await addNewCommentService({
        parentId: replyId,
        ...reply,
        createdAt: new Date(),
      });
      const { data } = await getAllCommentsService();
      setComments(data);
      setSelectedCommentId(null);
      setReply({
        name: "",
        email: "",
        body: "",
      });
    } catch (error) {}
  };

  return (
    <form className={styles.replyForm} onSubmit={addReplyHandler}>
      <div className={styles.details}>
        <div>
          <input
            type="text"
            name="name"
            value={reply.name}
            onChange={changeHandler}
            placeholder="Your Name..."
          />
          <input
            type="email"
            name="email"
            value={reply.email}
            onChange={changeHandler}
            placeholder="Your Email..."
          />
        </div>
        <button
          className={styles.closeBtn}
          onClick={() => setSelectedCommentId(null)}
        >
          <FaTimes />
        </button>
      </div>
      <div className={styles.content}>
        <textarea
          placeholder="Comment"
          name="body"
          value={reply.body}
          onChange={changeHandler}
        ></textarea>
        <button className={styles.sendBtn}>
          <FaTelegram />
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
