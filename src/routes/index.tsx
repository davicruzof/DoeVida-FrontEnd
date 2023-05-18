import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { Profile } from "@/pages/Profile";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Navigation;
