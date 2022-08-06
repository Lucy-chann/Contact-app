import { createContext, useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { requestTryCatcher } from "../utils/NetworkFuncs/networkFuncs";
import {
  getUserApiRequest,
  httpGetUserContacts,
} from "../services/userServices";
import { getUserByToken } from "../utils/UserTokenFuncs/UserTokenFuncs";

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

const NavbarListItemIndexContext = createContext();
const useNavbarListItemIndexContext = () =>
  useContext(NavbarListItemIndexContext);

const MobileMenuContext = createContext();
const useMobileMenuContext = () => useContext(MobileMenuContext);

const StateContexts = createContext();
const useStateContexts = () => useContext(StateContexts);

const contactInitialValue = {
  name: null,
  lastName: null,
  number: null,
  email: null,
  profileImage: null,
  address: null,
  contactDateAdded: null,
};

const userInitialValues = {
  id: null,
  userToken: null,
  profile: {},
  deviceType: null,
};

const ContactsContextComp = ({ history, children }) => {
  const [user, setUser] = useState(userInitialValues);
  const [contacts, setContacts] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.onresize = () => {
    setWindowWidth(window.innerWidth);
  };

  const [navbarListItemOn, setNavbarListItemOn] = useState("/");

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const changePage = (pagePath) => {
    history.push(pagePath);
    setNavbarListItemOn(pagePath);
  };

  const getUser = async () => {
    const res = await requestTryCatcher(() =>
      getUserApiRequest(localStorage.getItem("user-token"))
    );

    setUser(res.data.length > 0 ? res.data[0] : userInitialValues);
  };

  const getUserContacts = async () => {
    const { data } = await requestTryCatcher(() =>
      httpGetUserContacts(user.userToken)
    );

    setContacts(data);
  };

  useEffect(() => {
    changePage("/");
    getUserByToken(getUser).then((res) => {
      res.done && getUser();
    });
  }, []);

  useEffect(() => {
    getUserContacts();
  }, [user]);

  return (
    <StateContexts.Provider value={{ windowWidth, getUserContacts }}>
      <UserContext.Provider value={{ user, setUser, contacts, setContacts }}>
        <NavbarListItemIndexContext.Provider
          value={{ navbarListItemOn, setNavbarListItemOn, changePage }}
        >
          <MobileMenuContext.Provider
            value={{ isMobileMenuOpened, setIsMobileMenuOpened }}
          >
            {children}
          </MobileMenuContext.Provider>
        </NavbarListItemIndexContext.Provider>
      </UserContext.Provider>
    </StateContexts.Provider>
  );
};

const useNavbarHandlers = () => {
  const { setNavbarListItemOn } = useNavbarListItemIndexContext();

  const navbarMenuItemClickHandler = (val) => {
    setNavbarListItemOn(val);
  };

  return { navbarMenuItemClickHandler };
};

export {
  useStateContexts,
  useUserContext,
  useNavbarListItemIndexContext,
  useMobileMenuContext,
  userInitialValues,
};
export { useNavbarHandlers };
export default withRouter(ContactsContextComp);
