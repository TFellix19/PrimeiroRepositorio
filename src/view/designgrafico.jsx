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
    const [descricao, setdescricao] = useState("");
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
      console.log(servicos);
  
      api
        .post("cliente/create", datacliente)
        .then((res) => {
          let idcliente;
          if (res.data.success) {
            const data = res.data.data;
            idcliente = data.idCliente;
            setclienteid(idcliente);
          }
          const datapedido = {
            idcliente: idcliente,
            detalhes: detalhes,
            subservicos: servicos,
          };
  
          api
            .post("pedidos/create", datapedido)
            .then((data) => {
              if (data.status == "200") {
                toast.success("Subserviço criado com sucesso", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                sendError("Erro ao criar subserviço");
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
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
        <div className="App bodyorcadesign">
            <nav className="navbar navbar-light bg-transparent">
                <div className="container-fluid">
                    <a className="navbar-brand"><img  src={("./assets/logoincommun.png")} style={{ width: '240px', height: '42.26px' }}></img></a>
                    <Link to="/dashboard" ><RiLoginCircleFill className="float-end" style={{width:'4em', height:'auto', color:'#ffcc00'}}/> </Link>
                </div>
            </nav>
            <br></br>
            <h1 className="header">Orçamentos</h1>
            <br></br>
            <div className="dropdown" style={{ paddingLeft: '10%' }}>
                <button className="btn btn-secondary dropdown-toggle" style={{ backgroundColor: '#ffcc00', border: 'none' }} type="button"
                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Design Gráfico
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: '#ffcc00' }}>
                    <li><Link className="dropdown-item dropdown-itemdesign" to="/">Marketing Digital</Link></li>
                    <li><Link className="dropdown-item dropdown-itemdesign" to="/websiteselojasonline">Websites &amp; Lojas Online</Link></li>
                    <li><Link className="dropdown-item dropdown-itemdesign" to="/comunicacaoeconsultoria">Comunicação &amp; Consultoria</Link></li>
                </ul>

            </div>
            <br></br>
            <div>
                <p className="hr-lines">
                    Impacte o consumidor<br></br>
                    Um produto para ser de excelência além de eficiente, é necessário que tenha um design funcional e prático. Tem uma ideia em mente e dificuldade em executá-la?
                    Na incommun tratamos desde a conceção do produto até ao rótulo final, através da junção de técnicas de design atuais que refletem a identidade e visão da sua marca.
                    Criamos o produto que sempre desejou!
                </p>
            </div>

            <div className="service mb-5">
                <h2 className="serviceText">Caso deseje vários serviços poderá também ter uma experiência
                    totalmente personalizada!</h2>

                <div className="mx-5 " style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gridRow: 'auto auto',
                    gap: '20px'
                }}>
                    {servicos.map((serv,index) => (
                        <DropDownServico servico={serv} key={index} indexServico={index} onServicoChange={(changes,indexServico) => { 
                            var newArray = [...servicos];
                            newArray[indexServico] = changes;
                            setServicos(newArray);
                        }} />
                    ))}
                    
                </div>
                <br></br>
            </div>
          <div className="container">
            <div className="forms">
                <h1 className="formsTitle">Formulário</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label for="exampleInputName1">Nome</label>
                        <input type="text" className="form-control" id="exampleInputName1" placeholder="Nome" 
                        value={nome}
                        onChange={(e) => { setNome(e.target.value) }}></input>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Endereço de email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <br></br>
                    <div className="form-group formMobile">
                        <label for="exampleInputMobilePhoneNumber1">Telemóvel</label>
                        <input type="number" className="form-control" id="exampleInputMobilePhoneNumber1" placeholder="Número de telemóvel"
                          value={contacto}
                          onChange={(e) => { setContacto(e.target.value) }}></input>
                    </div>
                    <br></br>
                    <div className="form-group formDescription">
                        <label for="exampleInputDescription1">Descrição</label>
                        <input type="password" className="form-control" id="exampleInputDescription1"
                            placeholder="Breve descrição do serviço desejado"
                            value={descricao}
                            onChange={(e) => { setdescricao(e.target.value) }}></input>
                    </div>
                    <br></br>
                    <div className="btnForms">
                        <button type="submit" 
                        className="btn btn-warning btnSubmit"
                        style={{ marginLeft: '45%', color: 'white', backgroundColor: '#ffcc00' }}
                        >Submeter</button>
                        <button type="button" 
                        style={{ marginLeft: '2%', color: 'white', backgroundColor: '#ffcc00' }}
                        className="btn btn-warning btnClean" 
                        onClick={() => {
                            setNome('')
                            setEmail('')
                            setContacto('')
                            setdescricao('')
                        }}>Limpar</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
export default App;

