import { FaUser, FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { BiSelectMultiple } from "react-icons/bi";

/* navbar items datas */

const iconStyles = {
  fontSize: "30px",
};

const listItems = [
  {
    id: 1,
    itemPath: ["/", "/contacts"],
    listIcon: [
      <FaUser key="1" style={iconStyles} className="personIcon1" />,
      <FaUser key="2" style={iconStyles} className="personIcon2" />,
    ],
    text: "Contacts",
  },
  {
    id: 2,
    itemPath: "/search",
    listIcon: <FaSearch style={iconStyles} />,
    text: "Search",
  },
  {
    id: 3,
    itemPath: "/profile",
    listIcon: <FaUser style={iconStyles} />,
    text: "Profile",
  },
];

/* Contact page buttons Datas */

const extraButtonDatas = [
  {
    id: 1,
    Icon: BiSelectMultiple,
    handler: (changePageHandler) => {
      changePageHandler("/awdcwad");
    },
  },
  {
    id: 2,
    Icon: FaUserPlus,
    handler: (changePageHandler) => {
      changePageHandler("/add-contact");
    },
  },
];

/* add contact input datas */

const inputDatas = [
  {
    id: 1,
    inputPropertyName: "name",
    attributes: { type: "text", name: "name" },
    placeholderText: "Name",
    inFullnameGroup: true,
  },
  {
    id: 2,
    inputPropertyName: "lastName",
    attributes: { type: "text", name: "last-name" },
    placeholderText: "Last Name",
    inFullnameGroup: true,
  },
  {
    id: 3,
    inputPropertyName: "number",
    attributes: {
      type: "tel",
      name: "number",
      onInput: (e) => {
        e.target.value = e.target.value
          .replace(/[^0-9.]/g, "")
          .replace(/(\..*?)\..*/g, "$1");
      },
    },
    placeholderText: "Number",
  },
  {
    id: 4,
    inputPropertyName: "email",
    attributes: { type: "email", name: "email" },
    placeholderText: "Email",
  },
  {
    id: 5,
    inputPropertyName: "address",
    attributes: { type: "address", name: "address" },
    placeholderText: "Address",
  },
];

export { listItems, extraButtonDatas, inputDatas };
