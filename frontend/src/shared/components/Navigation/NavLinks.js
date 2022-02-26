import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import Button from "../FormElements/Button/Button";

import "./NavLinks.css";

const NavLinks = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/foodPlaces`}>MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/foodplace/new">ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink
            to="/auth"
            // onClick={props.onClick}
            // className={({ isActive }) => "nav-links" + (isActive ? "active" : "")}
          >
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button onClick={logoutHandler} danger>
            LOGOUT
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
