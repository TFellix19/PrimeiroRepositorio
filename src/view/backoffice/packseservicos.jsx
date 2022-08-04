import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../CSS/dashboard.css";
import { Navbar } from "../../components/Navbar";
import { HorizontalMenu } from "../../components/HorizontalMenu";
import { api } from "../../api";

function PackServicos() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalShow, setModalShow] = React.useState(false);
  const [servicos, setServicos] = useState([]);

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

  return (
    <div className="">
      <Navbar page="Packseservicos" />
      <div className="container">
        <HorizontalMenu servicos={servicos} />
      </div>
    </div>
  );
}
export default PackServicos;
