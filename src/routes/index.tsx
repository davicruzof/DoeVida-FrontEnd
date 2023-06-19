import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Navigation;
