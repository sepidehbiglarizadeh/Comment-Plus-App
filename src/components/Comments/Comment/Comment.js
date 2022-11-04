import styles from "./Comment.module.css";
import male from "../../.././assets/images/male.png";
import female from "../../.././assets/images/female.png";
import { Link } from "react-router-dom";
import getRandomAvatar from "../../../utils/getRandomAvatar";

const avatars = [male, female];

const Comment = ({name,body,email,createdAt,id}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.imgWrapper}>
        <img src={getRandomAvatar(avatars)} alt="avatar" />
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <div>{name}</div>
          <span>. {createdAt}</span>
        </div>
        <p>{body.substr(1,50)} ...</p>
        <Link to={`/comment/${id}`} className={styles.fullCmBtn}>Show</Link>
      </div>
    </div>
  );
};

export default Comment;