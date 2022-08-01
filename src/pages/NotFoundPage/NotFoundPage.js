import pageNavActiver from "../../utils/pageNavActiver/pageNavActiver";

const NotFoundPage = () => {
  return (
    <h1>
      Page Not Found - <mark>ERR 404</mark>
    </h1>
  );
};

export default pageNavActiver(NotFoundPage, "*");
