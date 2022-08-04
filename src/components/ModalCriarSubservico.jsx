import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../api";

export function ModalCriarSubservico({ servico, show, onHide, handleChange }) {
  let [nome, setNome] = useState("");
  let [preco, setPreco] = useState(0);
  let [estado, setEstado] = useState("false");

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "nome":
        setNome(e.target.value);
        break;
      case "preco":
        setPreco(e.target.value);
        break;
      case "estado":
        setEstado(e.target.checked);
        break;
    }
  };
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
  const criarSubservico = () => {
    let valid = true;
    if (nome == "" || preco == "") {
      valid = false;
      sendError("Os campos não podem estar vazios");
    }
    if (preco <= 0) {
      valid = false;
      sendError("Preço inválido");
    }
    if (valid) {
      let servic = {
        nome: nome,
        estadosubservico: estado,
        idservico: servico.idServico,
        preco: preco,
      };
      api.post("subservico/create", servic).then((data) => {
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
      });
    }
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Criar um subserviço
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Nome:{" "}
          <input name="nome" className="form-control" type="text" onChange={handleInputChange}></input>
        </p>
        <p>
          Preço:
          <input
            className="form-control"
            name="preco"
            type="number"
            onChange={handleInputChange}
          ></input>
        </p>
        <p>
          Estado do subserviço:
          <input
            class="form-check-input"
            name="estado"
            type="checkbox"
            onChange={handleInputChange}
          ></input>
        </p>
        <p>Serviço: {servico?.nome}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success" onClick={criarSubservico}>
          Criar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
