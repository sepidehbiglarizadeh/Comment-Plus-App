import styles from "./Comment.module.css";
import male from "../../.././assets/images/male.png";
import female from "../../.././assets/images/female.png";

const avatars = [male, female];

const randomAvatar = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const Comment = ({name,body,email,createdAt}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.imgWrapper}>
        <img src={randomAvatar(avatars)} alt="avatar" />
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <div>{name}</div>
          <span>. {createdAt}</span>
        </div>
        <p>{body.substr(1,50)} ...</p>
      </div>
    </div>
  );
};

export default Comment;
