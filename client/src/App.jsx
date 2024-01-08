import { Routes, Route, redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Data from "./pages/Data";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";


const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={ <DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/data" element={ <DashboardLayout><Data /></DashboardLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </>
  );
};

export default App;
