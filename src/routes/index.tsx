import { useContext, useEffect } from "react";
import AuthRoutes from "./AuthRoutes";
import NoAuthRoutes from "./NoAuthRoutes";
import { AuthContext } from "../context/auth";

const Navigation = () => {
  const { authValues, setAuthValues } = useContext(AuthContext);

  useEffect(() => {
    const authStorage = window.sessionStorage.getItem("authStorage");
    if (authStorage) {
      const auth = JSON.parse(authStorage);
      setAuthValues(auth);
    }
  }, []);

  console.log(authValues.signed);

  return authValues.signed ? <AuthRoutes /> : <NoAuthRoutes />;
};

export default Navigation;
