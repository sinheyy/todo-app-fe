import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";


function App() {
  const [user, setUser] = useState(null);

  // token을 통해 유저 정보를 가져옴
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");    // token으로 set 했으니 token으로 get

      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }

    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    getUser()
  }, []);

  return (
    <Routes>

      <Route path="/" element={<PrivateRoute user={user}><TodoPage user={user} setUser={setUser} /></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;