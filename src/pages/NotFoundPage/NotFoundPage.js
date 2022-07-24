import navbarActiveRemover from "../../utils/navbarActiveRemover/navbarActiveRemover";

const NotFoundPage = () => {
  return (
    <h1>
      Page Not Found - <mark>ERR 404</mark>
    </h1>
  );
};

export default navbarActiveRemover(NotFoundPage, "*");
