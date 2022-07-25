import { useEffect, useRef } from "react";
import styles from "./mobileMenu.module.css";
import { listItems } from "../../utils/ElementDatas/ElementDatas";
import routes from "../../routes";
import { NavLink } from "react-router-dom";
import {
  useNavbarListItemIndexContext,
  useMobileMenuContext,
} from "../../providers/ContactsContext";

const MobileMenu = () => {
  const { navbarListItemOn, setNavbarListItemOn } =
    useNavbarListItemIndexContext();

  const { isMobileMenuOpened, setIsMobileMenuOpened } = useMobileMenuContext();

  const componentRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (!ref.contains(e.target)) {
          setIsMobileMenuOpened(false);
        }
      }
    }
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    return () => setIsMobileMenuOpened(false);
  }, []);

  const menuIconElements = [];

  for (let i = 1; i <= 3; i++) {
    const element = (
      <span
        key={i}
        className={`line${i}${isMobileMenuOpened ? ` line${i}-opened` : ""}`}
      ></span>
    );
    menuIconElements.push(element);
  }

  return (
    <header id="mobile-menu" ref={componentRef}>
      <div className="menu-content-container">
        <button
          className="menu-btn"
          onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
        >
          {menuIconElements}
        </button>
        <h1 className={styles.menuTitle}>Contact App</h1>
      </div>
      <div
        className={`menu-opened-content-container${
          isMobileMenuOpened ? " menu-opened" : ""
        }`}
      >
        <nav>
          <ul className={styles.mobileMenuList}>
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
                            return navbarListItemOn === path
                              ? " listItemOn"
                              : "";
                          })
                          .toString()
                          .replace(",", "")}`
                      : `listItem${
                          navbarListItemOn === itemPathValue
                            ? " listItemOn"
                            : ""
                        }`
                  }
                  onClick={() => setNavbarListItemOn(itemPathValue)}
                >
                  <NavLink
                    className="menuLink"
                    to={
                      Array.isArray(routes[index].path)
                        ? routes[index].path[routes[index].path.length - 1]
                        : routes[index].path
                    }
                  >
                    <div className="iconContainer">{listIcon}</div>
                    <p className="listItemText">{text}</p>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MobileMenu;
