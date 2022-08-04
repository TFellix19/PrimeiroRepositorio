import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { api } from "../api";
import {toast } from 'react-toastify';
import Pedidos from "../view/backoffice/pedidos";

export function EditarPedidosModal({ show, onHide, pedido}) {
  const [estado, setEstado] = useState("");
  const [data, setData] = useState("");

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

  

  function SendUpdate() {
    const datapedidospost = { 
      estado: estado == "" ? pedido.estado : estado,
      data: data == "" ? pedido.data : data,
    };
    
    api.put("/pedidos/updatepedido/" + pedido.idpedidos, datapedidospost).then((data) => {
        if (data.status="200") {
          toast.success('Pedido alterado com sucesso', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        } else {
          sendError("Ocorreu um erro ao tentar alterar o pedido")
        }
      })
      .catch((error) => {
        alert(error);
      });
  }



  const deletePedido = (e) => {
    api.delete("pedidos/deletepedido/"+ pedido.idpedidos).then((data)=>{
    onHide();
    if (data.status="200") {
      toast.success('Pedido apagado com sucesso', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      sendError("Ocorreu um erro ao tentar apagar o pedido")
    }
    })
  }

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
         Edição dos Pedidos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select  className="form-control"
             onChange={
              (e) => {setEstado(e.target.value);
            }}>
            <option value="">{pedido?.estado}</option>
            <option value="Aceite">Aceite</option>
            <option value="Pendente">Pendente</option>
            <option value="Recusado">Recusado</option>
          </select>
        <br></br>
        <input
          className="form-control"
          type="text"
          value={pedido?.data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={SendUpdate}>Editar </button>
        <button className="btn btn-danger" onClick={deletePedido}>Apagar </button> 
      </Modal.Footer>
    </Modal>
  );
}
