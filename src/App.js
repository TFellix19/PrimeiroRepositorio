import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import Start from "./view/start";
import Designgrafico from "./view/designgrafico";
import Websiteselojasonline from "./view/websiteselojasonline";
import Comunicacaoeconsultoria from "./view/comunicacaoeconsultoria";
import Dashboard from "./view/backoffice/dashboard";
import Pedidos from "./view/backoffice/pedidos";
import Graficoeanalise from "./view/backoffice/graficoseanalise";
import Packseservicos from "./view/backoffice/packseservicos";
import Login from "./view/backoffice/login";
import AuthService from "./view/auth.service";

function App() {
  const [currentUser, setcurrentUser] = useState("");
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setcurrentUser({ currentUser: user });
    }
  });

  function logOut(){
    AuthService.logout();
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/designgrafico" element={<Designgrafico />} />
          <Route path="/websiteselojasonline" element={< Websiteselojasonline />} />
          <Route path="/comunicacaoeconsultoria" element={< Comunicacaoeconsultoria />} />
          <Route path="/dashboard" element={< Dashboard />} />
          <Route path="/pedidos" element={< Pedidos />} />
          <Route path="/graficoseanalise" element={< Graficoeanalise />} />
          <Route path="/packseservicos" element={< Packseservicos />} />
          <Route path="/login" element={< Login />} />
        </Routes>
      </Router>
      <ToastContainer style={{ width: "fit-content" }} />
    </div>
  );
}

export default App;
