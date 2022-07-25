import styles from "./navbar.module.css";
import { listItems } from "../../utils/ElementDatas/ElementDatas";
import routes from "../../routes";
import { NavLink } from "react-router-dom";
import {
  useNavbarListItemIndexContext,
  useNavbarHandlers,
} from "../../providers/ContactsContext";

const Navbar = () => {
  const { navbarListItemOn } = useNavbarListItemIndexContext();

  const { navbarMenuItemClickHandler } = useNavbarHandlers();

  return (
    <section id="navbar-section">
      <nav>
        <ul className={styles.navbarList}>
          {listItems.map(({ id, itemPath, listIcon, text }, index) => {
            const isPathAnArray = Array.isArray(itemPath);

            const itemPathValue = isPathAnArray
              ? itemPath[itemPath.length - 1]
              : itemPath;

            return (
              <li
                key={id}
                className={
                  isPathAnArray
                    ? `listItem${itemPath
                        .map((path) => {
                          return navbarListItemOn === path ? " listItemOn" : "";
                        })
                        .toString()
                        .replace(",", "")}`
                    : `listItem${
                        navbarListItemOn === itemPathValue ? " listItemOn" : ""
                      }`
                }
                onClick={() => navbarMenuItemClickHandler(itemPathValue)}
              >
                <NavLink
                  to={
                    Array.isArray(routes[index].path)
                      ? routes[index].path[routes[index].path.length - 1]
                      : routes[index].path
                  }
                  className="menuLink"
                >
                  <div className="iconContainer">{listIcon}</div>
                  <p className="listItemText">{text}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
