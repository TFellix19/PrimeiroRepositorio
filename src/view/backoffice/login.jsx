import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { hover } from "@testing-library/user-event/dist/hover";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../view/auth.service";
import authHeader from '../../view/auth.header';
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { toast } from 'react-toastify';

export function Login() {
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dataFuncionario, setdataFuncionario] = useState("");
  const [navigate, setnavigate] = useState("");

  function LoadFuncionario() {
    const url = "/funcionario/list";
    api.get(url, { headers: authHeader() }).then((res) => {
        console.log();
        if (res.data.success) {
          const data = res.data.data;
          setdataFuncionario(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function sendDelete(idfuncionario) {
    const baseUrl = ("/funcionario/delete/" + idfuncionario)
    api.post(baseUrl, { headers: authHeader(), id: idfuncionario }).then(response => {
      if (response.data.success) {
        toast.success('Pedido apagado com sucesso', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        //LoadFuncionario();
      }
    })
      .catch(error => {
        alert("Error 325 ")
      })
  }

  async function HandleLogin(event) {
    event.preventDefault();
    setmessage("");
    setloading(true);
    AuthService.login(email, password)
      .then((res) => {
        if (res === "" || res === false) {
          setmessage("Autenticação falhou.");
          setloading(false);
        }
        else {
          navigate("/");
        }
      })
      .catch((error) => {
        setmessage("Autenticação falhou.");
        setloading(false);
      });
  }

  return (
    <>
      <div className="col-md-4">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Form onSubmit={HandleLogin}>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={email}
                onChange={(value) => setemail(value.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(value) => setpassword(value.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">
                <span>Login</span>
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;