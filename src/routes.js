import HomePage from "./components/pages/HomePage/HomePage";
import NewCommentPage from "./components/pages/NewComment/NewComment";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/new-comment", element: <NewCommentPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
