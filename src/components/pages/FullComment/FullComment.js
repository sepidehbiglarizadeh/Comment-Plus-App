import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getOneCommentService from "../../../services/getOneCommentService";
import styles from "./FullComment.module.css";
import { ThreeDots } from "react-loader-spinner";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";
import getRandomAvatar from "../../../utils/getRandomAvatar";
import { FaRegTrashAlt } from "react-icons/fa";
import deleteCommentService from "../../../services/deleteCommentService";

const avatars = [male, female];

const FullCommentPage = () => {
  const [comment, setComment] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOneCommentService(id)
        .then((res) => setComment(res.data))
        .catch();
    }
  }, [id]);

  const deleteCommentHandler = async () => {
    try {
      await deleteCommentService(id);
      navigate("/");
      setComment(null);
    } catch (error) {}
  };

  const renderFullComment = () => {
    let renderValue = <p>Select a Comment</p>;

    if (id) {
      renderValue = (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#a5b4fc"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      );
    }

    if (comment) {
      renderValue = (
        <div className={styles.comment}>
          <div className={styles.imgWrapper}>
            <img src={getRandomAvatar(avatars)} alt="avatar" />
          </div>
          <div className={styles.content}>
            <div className={styles.detail}>
              <div>{comment.name}</div>
              <span>. {comment.createdAt}</span>
            </div>
            <div className={styles.email}>Email : {comment.email}</div>
            <p>{comment.body}</p>
            <div className={styles.btnsWrapper}>
              <button
                className={styles.deleteBtn}
                onClick={deleteCommentHandler}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return renderValue;
  };

  return (
    <section className={styles.fullComment}>{renderFullComment()}</section>
  );
};

export default FullCommentPage;
