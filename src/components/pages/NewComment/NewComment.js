import { useState } from "react";
import { useNavigate } from "react-router-dom";
import addNewCommentService from "../../../services/addNewCommentService";
import styles from "./NewComment.module.css";

const NewCommentPage = () => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const addNewCommentHandler = async (e) => {
    e.preventDefault();
    try {
      await addNewCommentService({
        ...comment,
        createdAt: "1 min ago",
        parentId: null,
      });
      navigate("/");
    } catch (error) {}
  };

  return (
    <section className={styles.newComment} onSubmit={addNewCommentHandler}>
      <form className={styles.form}>
        <div>
          <label htmlFor="name">Name : </label>
          <input type="text" id="name" name="name" onChange={changeHandler} />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input type="text" id="email" name="email" onChange={changeHandler} />
        </div>
        <div>
          <label htmlFor="body">New Comment :</label>
          <textarea id="body" name="body" onChange={changeHandler}></textarea>
        </div>
        <button type="submit">Add New Comment</button>
      </form>
    </section>
  );
};

export default NewCommentPage;
