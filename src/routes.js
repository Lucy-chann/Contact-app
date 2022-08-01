import ContactsPage from "./pages/ContactsPage/ContactsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddContactPage from "./pages/AddContactPage/AddContactPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const routes = [
  {
    id: 1,
    path: ["/", "/contacts"],
    exact: true,
    index: true,
    component: ContactsPage,
  },
  { id: 2, path: "/search", component: SearchPage },
  { id: 3, path: "/profile", component: ProfilePage },
  {
    id: 4,
    path: "/add-contact",
    Component: AddContactPage,
  },
  { id: 5, component: NotFoundPage },
];

export default routes;
