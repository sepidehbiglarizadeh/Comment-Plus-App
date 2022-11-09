import axios from "axios";

axios.defaults.baseURL = "https://my-json-server.typicode.com/sepidehbiglarizadeh/Comment-Plus-App";



const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
