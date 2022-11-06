import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import addNewCommentService from "../../../services/addNewCommentService";
import updateCommentService from "../../../services/updateCommentService";
import styles from "./NewComment.module.css";

const NewCommentPage = () => {
  const { state } = useLocation();

  const [comment, setComment] = useState(
    state
      ? {
          name: state.name,
          createdAt: state.createdAt,
          body: state.body,
          email: state.email,
          parentId: state.parentId,
        }
      : {
          name: "",
          body: "",
          email: "",
        }
  );

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const addNewCommentHandler = async (e) => {
    e.preventDefault();
    try {
      await addNewCommentService({
        ...comment,
        createdAt: new Date(),
        parentId: null,
      });
      setComment({
        name: "",
        body: "",
        email: "",
      });
      navigate("/");
    } catch (error) {}
  };

  const editCommentHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCommentService(state.id, comment);
      setComment({
        name: "",
        body: "",
        email: "",
      });
      navigate("/");
    } catch (error) {}
  };

  return (
    <section
      className={styles.newComment}
      onSubmit={state ? editCommentHandler : addNewCommentHandler}
    >
      <form className={styles.form}>
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            name="name"
            value={comment.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            id="email"
            name="email"
            value={comment.email}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="body">New Comment :</label>
          <textarea
            id="body"
            name="body"
            value={comment.body}
            onChange={changeHandler}
          ></textarea>
        </div>
        <button type="submit">
          {state ? "Edit Comment" : "Add New Comment"}
        </button>
      </form>
    </section>
  );
};

export default NewCommentPage;
