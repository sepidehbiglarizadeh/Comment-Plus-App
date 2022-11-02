import Comment from "../../Comments/Comment/Comment";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <Comment/>
    </section>
  );
};

export default HomePage;
