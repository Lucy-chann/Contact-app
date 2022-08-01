import { useEffect } from "react";
import { useNavbarHandlers } from "../../providers/ContactsContext";

const pageNavActiver = (Comp, path) => {
  const UpdatedComponent = (props) => {
    const { navbarMenuItemClickHandler } = useNavbarHandlers();

    useEffect(() => {
      navbarMenuItemClickHandler(path);
    }, []);

    return <Comp {...props} />;
  };

  return UpdatedComponent;
};

export default pageNavActiver;
