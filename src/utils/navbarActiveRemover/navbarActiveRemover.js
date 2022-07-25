import { useEffect } from "react";
import { useNavbarHandlers } from "../../providers/ContactsContext";

const navbarActiveRemover = (Comp, path) => {
  return () => {
    const { navbarMenuItemClickHandler } = useNavbarHandlers();

    useEffect(() => {
      navbarMenuItemClickHandler(path);
    }, []);

    return <Comp />;
  };
};

export default navbarActiveRemover;
