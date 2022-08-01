import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import "./viewSection.css";
import { useStateContexts } from "../../providers/ContactsContext";
import { useMobileMenuContext } from "../../providers/ContactsContext";

const ViewSection = ({ pageDimmer }) => {
  const { windowWidth } = useStateContexts();

  const { isMobileMenuOpened } = useMobileMenuContext();

  let phoneSize = "phone-size";

  if (isMobileMenuOpened) {
    phoneSize = "phone-size-menu-opened";
  } else {
    phoneSize = "phone-size";
  }

  return (
    <section id="view-section" className={windowWidth < 470 ? phoneSize : ""}>
      <Switch>
        {routes.map(({ id, Component, ...rest }) => (
          <Route
            key={id}
            {...rest}
            render={
              id === 4 ? () => <Component pageDimmer={pageDimmer} /> : null
            }
          />
        ))}
      </Switch>
    </section>
  );
};

export default ViewSection;
