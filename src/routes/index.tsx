import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/SignIn";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
};

export default Navigation;
