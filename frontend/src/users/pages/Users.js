import React from "react";
import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Saini",
    image:
      "https://i.pinimg.com/280x280_RS/f6/e6/83/f6e6839527aa1df7a8c72118812b1a18.jpg",
    foodPlacesCount: 3,
  },
];

const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
