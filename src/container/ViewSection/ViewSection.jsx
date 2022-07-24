import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import "./viewSection.css";
import { useMobileMenuContext } from "../../providers/ContactsContext";

const windowWidth = window.innerWidth;

const ViewSection = () => {
  const { isMobileMenuOpened } = useMobileMenuContext();

  let phoneSize = "phone-size";

  if (isMobileMenuOpened) phoneSize = "phone-size-menu-opened";

  return (
    <section
      id="view-section"
      className={`${windowWidth < 470 ? phoneSize : ""}`}
    >
      <Switch>
        {routes.map(({ id, ...rest }) => (
          <Route key={id} {...rest} />
        ))}
      </Switch>
    </section>
  );
};

export default ViewSection;
