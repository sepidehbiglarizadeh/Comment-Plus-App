import http from "./httpServices";

const updateCommentService = (id,data) => {
    return http.put(`/comments/${id}`,data);
}
 
export default updateCommentService;