import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../CSS/dashboard.css";
import { api } from "../../api";
import { Navbar } from "../../components/Navbar";
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
function Pedidos() {
  return (
    <>
      <Navbar page="pedidos" />
      <div className="container" style={{ marginTop: "10em" }}>
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
  );
}
export default Pedidos;
