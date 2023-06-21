import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AuthRoutes;
