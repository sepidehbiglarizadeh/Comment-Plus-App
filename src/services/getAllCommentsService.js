import http from "./httpServices";

const getAllCommentsService = () => {
  return http.get("/comments");
};

export default getAllCommentsService;
