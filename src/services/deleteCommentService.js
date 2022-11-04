import http from "./httpServices";

const deleteCommentService = (id) => {
    return http.delete(`/comments/${id}`);
}
 
export default deleteCommentService;