import styles from "./NewComment.module.css"

const NewCommentPage = () => {
  return (
    <section className={styles.newComment}>
      <form className={styles.form}>
        <div>
            <label htmlFor="name">Name : </label>
            <input type="text" id="name" name="name"/>
        </div>
        <div>
            <label htmlFor="email">Email : </label>
            <input type="text" id="email" name="email"/>
        </div>
        <div>
            <label htmlFor="body">New Comment :</label>
            <textarea id="body" name="body"></textarea>
        </div>
        <button type="submit">Add New Comment</button>
      </form>
    </section>
  );
};

export default NewCommentPage;
