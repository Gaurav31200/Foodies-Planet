import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NewFoodPlace from "./foodPlaces/pages/NewFoodPlace";
import UpdatePlace from "./foodPlaces/pages/UpdatePlace";
import UserPlaces from "./foodPlaces/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import Users from "./users/pages/Users";
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          {isLoggedIn && (
            <Route path="/foodplace/new" element={<NewFoodPlace />} />
          )}
          <Route path="/:userId/foodPlaces" element={<UserPlaces />} />
          {isLoggedIn && (
            <Route path="foodplaces/:placeId" element={<UpdatePlace />} />
          )}
          {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
          {isLoggedIn && (
            <Route path="*" element={<Navigate replace to="/" />} />
          )}
          {!isLoggedIn && (
            <Route path="*" element={<Navigate replace to="/auth" />} />
          )}
        </Routes>
      </main>
    </>
  );
};

export default App;
