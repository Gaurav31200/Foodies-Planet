import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import Backdrop from "../UIElements/Backdrop";
import MainHeader from "./MainHeader";

import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer show={drawerIsOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks onClick={closeDrawer} />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button onClick={openDrawer} className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Foodies Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks logout={logoutHandler} />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
