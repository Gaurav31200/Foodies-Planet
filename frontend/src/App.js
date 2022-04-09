import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { useAuth } from "./shared/hooks/auth-hook";

const NewFoodPlace = React.lazy(() =>
  import("./foodPlaces/pages/NewFoodPlace")
);
const UpdatePlace = React.lazy(() => import("./foodPlaces/pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./foodPlaces/pages/UserPlaces"));
const Users = React.lazy(() => import("./users/pages/Users"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useAuth();
  return (
    <>
      <MainNavigation />
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
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
      </Suspense>
    </>
  );
};

export default App;
