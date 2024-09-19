import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Enterprises from "../pages/Enterprises";
import AddEnterprises from "../pages/AddEnterprises";
import EditEnterprise from "../pages/EditEnterprises";
import ViewEnterprise from "../pages/ViewEnterprises";
import Items from "../pages/Itens";
import Vagas from "../pages/Vagas";
import AddVagas from "../pages/AddVaga";
import Agendamentos_Doador from "../pages/Agendamentos_Doador";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/enterprises" element={<Enterprises />} />
      <Route path="/addEnterprises" element={<AddEnterprises />} />
      <Route path="/editEnterprises" element={<EditEnterprise />} />
      <Route path="/viewEnterprises" element={<ViewEnterprise />} />
      <Route path="/apoio" element={<Items />} />
      <Route path="/agendamentos doador" element={<Agendamentos_Doador />} />
      <Route path="/vagas" element={<Vagas />} />
      <Route path="/addVaga" element={<AddVagas />} />
    </Routes>
  );
};

export default AuthRoutes;
