import { useEffect } from "react";
import { authActions } from "../store/auth-slice";
import { useSelector, useDispatch } from "react-redux";
let logoutTimer;
export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  let tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      const logout = () => {
        dispatch(authActions.logout());
      };
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [tokenExpirationDate, token, dispatch]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token && new Date(data.expirationTime) > new Date()) {
      dispatch(
        authActions.login({
          uId: data.userId,
          token: data.token,
          expirationTime: data.expirationTime,
        })
      );
    }
  }, [dispatch]);
};
