import Commentslist from "../../CommentsList/CommentsList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <Commentslist/>
    </section>
  );
};

export default HomePage;
