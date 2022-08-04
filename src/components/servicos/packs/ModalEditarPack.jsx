import React, { useState, useEffect } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function EditarPack({ subservico, show, onHide }) {
  let [nome, setNome] = useState("");
  let [desconto, setDesconto] = useState("");
  let [selectedPackId, setSelectedPack] = useState("");
  let [estadopack, setEstadopack] = useState("false");
  let [redessociais, setRedessociais] = useState("");
  let [postssemana, setPostssemana] = useState("");
  let [storiessemana, setStoriessemana] = useState("");
  let [covercapa, setCovercapa] = useState("");
  let [planificacaoeditorial, setPlanificacaoeditorial] = useState("false");
  let [consultoriadigital, setConsultoriaDigital] = useState("false");
  let [gestaocampanhas, setGestaocampanha] = useState("false");
  let [relatorioestatistico, setRelatorioestatistico] = useState("false");
  

  const handleSelectChange = (e) =>{
    setSelectedPack(e.target.value)
  }

  const handleInputChange = (e) => {
      switch (e.target.name) {
        case "nome":
          setNome(e.target.value);
          break;
        case "desconto":
          setDesconto(e.target.value);
          break;
        case "estadopack":
          setEstadopack(e.target.checked);
          break;
        case "redessociais":
          setRedessociais(e.target.value);
          break;
        case "postssemana":
          setPostssemana(e.target.value);
          break;
        case "storiessemana":
          setStoriessemana(e.target.value);
          break;
        case "covercapa":
          setCovercapa(e.target.value);
          break;
        case "planificacaoeditorial":
          setPlanificacaoeditorial(e.target.checked);
          break;
        case "consultoriadigital":
          setConsultoriaDigital(e.target.checked);
          break;
        case "gestaocampanhas":
          setGestaocampanha(e.target.checked);
          break;
        case "relatorioestatistico":
          setRelatorioestatistico(e.target.checked);
          break;
      }
  };

  const editarPack = () => {
    
      let valid = true;
      if (valid) {
        let packUpdate = {
          desconto: desconto,
          nome: nome,
          estadopack: estadopack,
          redessociais: redessociais,
          postssemana: postssemana,
          storiessemana: storiessemana,
          covercapa: covercapa,
          planificacaoeditorial: planificacaoeditorial,
          consultoriadigital: consultoriadigital,
          gestaocampanhas: gestaocampanhas,
          relatorioestatistico: relatorioestatistico,
        };
        console.log(packUpdate)
        console.log(selectedPackId)
        api.put("packs/updatepack/" + selectedPackId, packUpdate).then((data) => {
          console.log(data);
          if (data.status == "200") {
            toast.success("Pack alterado com sucesso", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      }
  };
  
  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar pack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select onChange={handleSelectChange}>
            <option value="" disabled selected hidden>
              Escolha um pack
            </option>
            {subservico[0]?.packs.map((pack) => (
              <option value={pack.idpack}>{pack.nome}</option>
            ))}
          </select>
          <p>
            Nome:{" "}
            <input name="nome" type="text" onChange={handleInputChange}></input>
          </p>
          <p>
            Desconto:{" "}
            <input
              name="desconto"
              type="text"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Estado do pack:
            <input
              name="estadopack"
              type="checkbox"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Redes sociais:{" "}
            <input
              name="redessociais"
              type="text"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Posts/semana:{" "}
            <input
              name="postssemana"
              type="text"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Stories/semana:{" "}
            <input
              name="storiessemana"
              type="text"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Cover|Capa:{" "}
            <input
              name="covercapa"
              type="text"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>Design Gráfico</p>
          <p>Copywriting</p>
          <p>
            Planificação Editorial:
            <input
              name="planificacaoeditorial"
              type="checkbox"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Consultoria Digital:
            <input
              name="consultoriadigital"
              type="checkbox"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Gestão de Campanhas:
            <input
              name="gestaocampanhas"
              type="checkbox"
              onChange={handleInputChange}
            ></input>
          </p>
          <p>
            Relatório Estatístico:
            <input
              name="relatorioestatistico"
              type="checkbox"
              onChange={handleInputChange}
            ></input>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success" onClick={editarPack}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
