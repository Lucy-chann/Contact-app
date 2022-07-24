import { createContext, useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { requestTryCatcher } from "../utils/NetworkFuncs/networkFuncs";
import {
  getUserApiRequest,
  httpGetUserContacts,
  httpGetContacts,
} from "../services/userServices";
import { getUserToken } from "../utils/UserTokenFuncs/UserTokenFuncs";
import { notification } from "../utils/alerts";

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
  userDatas: {
    contacts: [],
    profile: {},
  },
};

const ContactsContextComp = ({ history, children }) => {
  const [user, setUser] = useState(userInitialValues);
  const [contacts, setContacts] = useState([]);

  const [navbarListItemOn, setNavbarListItemOn] = useState("/");

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const changePage = (pagePath) => {
    history.push(pagePath);
    setNavbarListItemOn(pagePath);
  };

  const getAllUsers = async () => {
    const res = await requestTryCatcher(getUserApiRequest);

    setUser(res.data.length > 0 ? res.data[0] : userInitialValues);

    return res;
  };

  const getAllUserContacts = async () => {
    const res = await requestTryCatcher(() =>
      httpGetUserContacts(localStorage.getItem("user-token"))
    );

    setContacts(res.data);

    return res;
  };

  useEffect(() => {
    changePage("/");
    getUserToken()
      .then((res) => {
        res.done
          ? requestTryCatcher(getAllUsers)
          : notification({ type: "error", value: "Error" });
      })
      .catch((err) => {
        console.error(err);
      });

    getAllUserContacts();
  }, []);

  return (
    <StateContexts.Provider value={getAllUserContacts}>
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
