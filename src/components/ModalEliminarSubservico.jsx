import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import {toast } from 'react-toastify';
import { api } from "../api";

export function ModalEliminarSubservico({ servico, show, onHide, handleChange }) {
  let [subservico, setSubservico] = useState("Escolha um subserviço")
  const handleSelectChange = (e) => {
    setSubservico(e.target.value)
  }
  const deleteSubservico = (e) => {
    api.delete("subservico/deletesubservico/"+subservico).then(()=>{
     onHide();
    })
    toast.success('Subserviço apagado com sucesso', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Eliminar um subserviço
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <select className='form-select' onChange={handleSelectChange}>
            <option className='form-select' value="" disabled selected hidden>Escolha um subserviço</option>
            {servico?.subservicos.map((subservico) => <option className='form-select' value={subservico.idsubservico}>{subservico.nome}</option>)}
          </select>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger" onClick={deleteSubservico}>Apagar</Button>
      </Modal.Footer>
    </Modal >
  );
}