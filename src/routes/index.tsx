import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SIgnUp";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default Navigation;
