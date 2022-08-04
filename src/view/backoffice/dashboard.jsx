import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../CSS/dashboard.css";
import { Navbar } from "../../components/Navbar";
import { Chart } from "react-google-charts";
import { HorizontalMenu } from "../../components/HorizontalMenu";
import { api } from "../../api";
import { Modalvertical } from "../../components/Modal";
import { EditarPedidosModal } from "../../components/ModalEditarPedido";



function LoadFillData() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [pedidos, setPedido] = useState([]);
  const [modalEditarPedidosShow, setEditarPedidosShow] = React.useState(false);

  useEffect(() => {
    api
      .get("/pedidos/list")
      .then(({ data }) => {
        const dados = data.data;
        var newPedido = [];
        dados.map((PedidosAux) => {
          newPedido.push(
          PedidosAux

          );
        });
        setPedido(newPedido);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {pedidos.map((data, index) => {
        return (
          <>
            <tr key={index}>
              <td scope="row">{data.cliente?.nome}</td>
              <td>{data.cliente?.email}</td>
              <td>{data.estado}</td>
              <td>
                <div className="d-flex w-100">{data.data} </div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      setSelectedPedido(data);
                      console.log(data);
                      setModalShow(true);
                    }}
                  >
                    visibility
                  </span>

                  <span
                    id={data.idpedidos}
                    className="material-symbols-outlined"
                    onClick={() => {
                      setSelectedPedido(data);
                      setEditarPedidosShow(true);
                    }}
                  >
                    edit
                  </span>
                  <span>
                    {" "}
                    <a
                      className="material-symbols-outlined mailto"
                      href={`mailto:${data.email}`}
                    >
                      {" "}
                      mail{" "}
                    </a>{" "}
                  </span>
                </div>
              </td>
            </tr>

            <Modalvertical
              show={modalShow}
              onHide={() => setModalShow(false)}
              pedido={selectedPedido}
            />
            <EditarPedidosModal
              show={modalEditarPedidosShow}
              onHide={() => setEditarPedidosShow(false)}
              pedido={selectedPedido}
            />
          </>
        );
      })}
    </>
  );
}




export const data = [
  [
    "Element",
    "Density",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["Janeiro", 250, "color: #ffc107", null],
  ["Fevereiro", 300, "color: #ffc107", null],
  ["Março", 220, "color: #ffc107", null],
  ["Abril", 250, "color: #ffc107", null],
  ["Maio", 300, "color: #ffc107", null],
  ["Junho", 220, "color: #ffc107", null],
  ["Julho", 250, "color: #ffc107", null],
  ["Agosto", 300, "color: #ffc107", null],
  ["Setembro", 220, "color: #ffc107", null],
  ["Outubro", 250, "color: #ffc107", null],
  ["Novembro", 300, "color: #ffc107", null],
  ["Dezembro", 220, "color: #ffc107", null],
];

export const options = {
  title: "Número de pedidos por mês",
  width: "auto",
  height: "auto",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

//segundo grafico

export const infooo = [
  [
    "Year",
    "Marketing Digital",
    "Design Gráfico",
    "Web & Lojas",
    "Com. & Consult.",
  ],
  ["2019", 800, 400, 1000, 400],
  ["2020", 700, 460, 1034, 600],
  ["2021", 760, 800, 1200, 500],
  ["2022", 630, 540, 800, 200],
];

export const opcoes = {
  title: "Número de pedidos de serviço por ano",
  width: "auto",
  height: "auto",
  curveType: "function",
  legend: { position: "bottom" },
};


function App() {
  const [servicos, setServicos] = useState([]);//pedidos



//pedidos

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
            preco: subservicoAux.preco,
            idsubservico: subservicoAux.idsubservico,
          });
        });
        newServicos.push({
          nome: key,
          imagem: dados[key].imagem,
          ativo: false,
          idServico: dados[key].idServico,
          subservicos: newSubservicos,
        });
      });
      setServicos(newServicos);
    })
    .catch((error) => {
      alert(error);
    });
}, []);

//fim pedidos 





  return (
    
    <div className="App">
      <Navbar page="Dashboard" />
      <div className="container" style={{marginTop:'11em', marginLeft:'23.2em'}}>
        <div className="row">
          <div className="col-9">
            <div className="card w-auto h-auto me-5">
              <div className="card-body">
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="400px"
                  data={data}
                  options={options}
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="card w-auto h-auto">
              <div className="card-body">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  data={infooo}
                  options={opcoes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container">

      <HorizontalMenu servicos={servicos} />

      </div>

      <>
      
      <div className="container mt-5" style={{marginLeft:'16em'}}>
        <div className="row">
          <table className="table table-hover ">
            <thead>
              <tr>
                <td scope="col">Nome</td>
                <td scope="col">Email</td>
                <td scope="col">Estado</td>
                <td scope="col">Data</td>
                <td scope="col">Opções</td>
              </tr>
            </thead>
            <tbody>
              <LoadFillData />
            </tbody>
          </table>
        </div>
      </div>
    </>

      </div>
  );
}
export default App;
