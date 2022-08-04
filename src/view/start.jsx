import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CSS/styles.css";
import { DropDownServico } from "../components/DropDownServico";
import { api } from "../api";
import { toast } from "react-toastify";
import {RiLoginCircleFill} from 'react-icons/ri'

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [contacto, setContacto] = useState("");
  const [servicos, setServicos] = useState([]);
  const [clienteid, setclienteid] = useState("");

  useEffect(() => {
    api
      .get("/subservico/list")
      .then(({ data }) => {
        const dados = data.data;
        var newServicos = [];

        Object.keys(dados).map((key) => {
          var newSubservicos = [];

          dados[key].subservicos.map((subservicoAux) => {
            newSubservicos.push({
              nome: subservicoAux.nome,
              id: subservicoAux.idsubservico,
            });
          });
          newServicos.push({
            nome: key,
            imagem: dados[key].imagem,
            ativo: false,
            subservicos: newSubservicos,
          });
        });
        setServicos(newServicos);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const sendError = (erro) => {
    toast.error(erro, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    const datacliente = {
      nome: nome,
      email: email,
      contacto: contacto,
    };

    api
      .post("cliente/create", datacliente)
      .then((res) => {
        let idcliente;
        if (res.data.success) {
          const data = res.data.data;
          idcliente = data.idCliente;
          setclienteid(idcliente);
        }
     
        var selectedId = 0;
        servicos.map((servico) => {
          console.log(servico)
         servico.subservicos.map((subservico) => {
            if (subservico.ativo) {
              selectedId = subservico.id;
            }
          }
         )
        })
        const datapedido = {
          idcliente: idcliente,
          detalhes: detalhes,
          idsubservico: selectedId,
        }; 

        if (selectedId === 0) {
          sendError("Selecione pelo menos um serviço");
        } else {
          api
            .post("pedidos/create", datapedido)
            .then((data) => {
              if (data.status == "200") {
                toast.success("Pedido criado com sucesso", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                sendError("Erro ao criar pedido");
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    /*Submeter dados para API */
  }

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "nome":
        setNome(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "contacto":
        setContacto(e.target.value);
        break;
      case "detalhes":
        setDetalhes(e.target.value);
        break;
      case "idsubservico":
        setNome(e.target.checked);
        break;
    }
  };

  const criarPedido = () => {
    let valid = true;
    if (nome == "" || email == "" || contacto == "") {
      valid = false;
      sendError("Os campos nome, email e contacto não podem estar vazios");
    }
    if (valid) {
      let pedido = {
        nome: nome,
        email: email,
        contacto: contacto,
      };
      api.post("pedidos/create", pedido).then((data) => {
        if (data.status == "200") {
          toast.success("Pedido criado com sucesso", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          sendError("Erro ao criar pedido");
        }
      });
    }
  };

  return (
    <div className="App bodyorca">
      <nav className="navbar navbar-light bg-transparent">     
        <div className="container-fluid">   
          <a className="navbar-brand">
            <img
              src={"./assets/logoincommun.png"}
              style={{ width: "240px", height: "42.26px" }}
            ></img>
          </a>
          <Link to="/dashboard" ><RiLoginCircleFill className="float-end" style={{width:'4em', height:'auto', color:'white'}}/> </Link>
        </div>
      </nav>
      <br></br>
      <h1 className="header">Orçamentos</h1>
      <br></br>
      <div className="dropdown" style={{ paddingLeft: "10%" }}>
        <button
          className="btn btn-secondary dropdown-toggle"
          style={{ backgroundColor: "#DEB200", border: "none" }}
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Marketing Digital
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
          style={{ backgroundColor: "#ffcc00" }}
        >
          <li>
            <Link
              className="dropdown-item dropdown-itemmark"
              to="/designgrafico"
            >
              Design Gráfico
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item dropdown-itemmark"
              to="/websiteselojasonline"
            >
              Websites &amp; Lojas Online
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item dropdown-itemmark"
              to="/comunicacaoeconsultoria"
            >
              Comunicação &amp; Consultoria
            </Link>
          </li>
        </ul>
      </div>
      <br></br>
      <div>
        <p className="hr-lines">
          Estratégias de marketing digital<br></br>A estratégia implementada
          nesta empresa está a ser vantajosa? Quais os objetivos pretendidos com
          esta campanha/promoção? É muito importante definirmos um planeamento
          estratégico e perceber, com análises estatísticas, o que vale a pena
          apostar e o que não está a funcionar tão bem. Analisar resultados é
          fundamental para melhorar. Ao criar conteúdo vamos emocionar, vamos
          encantar e vamos humanizar. Quem gostou vai voltar a pesquisar por si!
        </p>
      </div>
      <h3 className="subtitle">Packs</h3>
      <div className="packs">
        <div className="card">
          <div className="card-body">
            <h4 style={{ color: "#ffcc00" }}>
              <b>START</b>
            </h4>
            <ul>
              <li>2 redes sociais</li>
              <li>2 posts/semana</li>
              <li>2 stories/semana</li>
              <li>1 cover/capa</li>
              <li>Design Gráfico</li>
              <li>Copywriting</li>
              <li className="delete">
                <del>Planificação Editorial</del>
              </li>
              <li className="delete">
                <del>Consultoria Digital</del>
              </li>
              <li className="delete">
                <del>Gestão de Campanhas</del>
              </li>
              <li className="delete">
                <del>Relatório Estatístico</del>
              </li>
            </ul>
          </div>
          <button className="btnPacks">
            {" "}
            <a href="#form"> Saber mais </a>
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <h4 style={{ color: "#ffcc00" }}>
              <b>BOOST</b>
            </h4>
            <ul>
              <li>2 redes sociais</li>
              <li>2 posts/semana</li>
              <li>2 stories/semana</li>
              <li>1 cover/capa</li>
              <li>Design Gráfico</li>
              <li>Copywriting</li>
              <li>Planificação Editorial</li>
              <li className="delete">
                <del>Consultoria Digital</del>
              </li>
              <li className="delete">
                <del>Gestão de Campanhas</del>
              </li>
              <li className="delete">
                <del>Relatório Estatístico</del>
              </li>
            </ul>
          </div>
          <button className="btnPacks">
            <a href="#form"> Saber mais </a>
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <h4 style={{ color: "#ffcc00" }}>
              <b>BOMB</b>
            </h4>
            <ul>
              <li>2 redes sociais</li>
              <li>2 posts/semana</li>
              <li>2 stories/semana</li>
              <li>1 cover/capa</li>
              <li>Design Gráfico</li>
              <li>Copywriting</li>
              <li>Planificação Editorial</li>
              <li>Consultoria Digital</li>
              <li>Gestão de Campanhas</li>
              <li>Relatório Estatístico</li>
            </ul>
          </div>
          <button className="btnPacks">
            <a href="#form"> Saber mais</a>
          </button>
        </div>
      </div>

      <div className="service mb-5">
        <h2 className="serviceText">
          Caso deseje vários serviços poderá também ter uma experiência
          totalmente personalizada!
        </h2>

        <div
          className="mx-5 "
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridRow: "auto auto",
            gap: "20px",
          }}
        >
          {servicos.map((serv, index) => (
            <DropDownServico
              servico={serv}
              key={index}
              indexServico={index}
              onServicoChange={(changes, indexServico) => {
                var newArray = [...servicos];
                newArray[indexServico] = changes;
                setServicos(newArray);
              }}
            />
          ))}
        </div>
        <br></br>
      </div>
      <div id="form" className="container">
        <div className="forms">
          <h1 className="formsTitle">Formulário</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label for="exampleInputName1">Nome</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName1"
                placeholder="Nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
              ></input>
            </div>
            <br></br>
            <div className="form-group">
              <label for="exampleInputEmail1">Endereço de email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <br></br>
            <div className="form-group formMobile">
              <label for="exampleInputMobilePhoneNumber1">Telemóvel</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputMobilePhoneNumber1"
                placeholder="Número de telemóvel"
                value={contacto}
                onChange={(e) => {
                  setContacto(e.target.value);
                }}
              ></input>
            </div>
            <br></br>
            <div className="form-group formDescription">
              <label for="exampleInputDescription1">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputDescription1"
                placeholder="Breve descrição do serviço desejado"
                value={detalhes}
                onChange={(e) => {
                  setDetalhes(e.target.value);
                }}
              ></input>
            </div>
            <br></br>
            <div className="btnForms">
              <button
                type="submit"
                className="btn btn-warning"
                style={{
                  marginLeft: "45%",
                  color: "white",
                  backgroundColor: "#deb200",
                }}
                onClick={handleFormSubmit}
              >
                Submeter
              </button>
              <button
                type="button"
                className="btn btn-primary btnClean"
                style={{
                  marginLeft: "2%",
                  color: "white",
                  backgroundColor: "#deb200",
                }}
                onClick={() => {
                  setNome("");
                  setEmail("");
                  setContacto("");
                  setDetalhes("");
                }}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
