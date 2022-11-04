import http from "./httpServices";

const getOneCommentService = (id) => {
    return http.get(`/comments/${id}`);
}
 
export default getOneCommentService;