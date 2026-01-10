import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
         path="/dashboard"
         element ={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
         }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
