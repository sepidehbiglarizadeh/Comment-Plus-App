import { useEffect, useState } from "react";
import getAllCommentsService from "../../../services/getAllCommentsService";
import { ThreeDots } from "react-loader-spinner";
import Comment from "../Comment/Comment";
import styles from "./CommentsList.module.css";

const Commentslist = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await getAllCommentsService();
        setComments(data.filter((d) => d.parentId === null));
      } catch (error) {
        setError(true);
      }
    };
    getComments();
  }, []);


  const renderComments = () => {
    let renderValue = (
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

    if (error) {
      renderValue = <p style={{ margin: "0 auto" }}>Fetching Data Failed</p>;
    }

    if (comments && !error) {
      renderValue = comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            id={comment.id}
            name={comment.name}
            email={comment.email}
            body={comment.body}
            createdAt={comment.createdAt}
          />
        );
      });
    }

    return renderValue;
  };

  return <section className={styles.commentsList}>{renderComments()}</section>;
};

export default Commentslist;
