import styles from "./Comment.module.css";
import male from "../../.././assets/images/male.png";
import female from "../../.././assets/images/female.png";

const avatars = [male, female];

const randomAvatar = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.imgWrapper}>
        <img src={randomAvatar(avatars)} alt="avatar" />
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <div>Sepideh</div>
          <span>. 1 hours ago</span>
        </div>
        <p>dshfklsdhfklsdhfklsdflksdhflksdhfldshfldlfhdlfhlsd....</p>
      </div>
    </div>
  );
};

export default Comment;
