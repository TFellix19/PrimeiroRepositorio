import React, { useState, useEffect } from "react";
import { ModalCriarSubservico } from "../../components/ModalCriarSubservico";
import { ModalEliminarSubservico } from "../../components/ModalEliminarSubservico";
import { api } from "../../api";
import { EditarPack } from "./packs/ModalEditarPack";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function Websiteselojas({ servicos }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalCriarShow, setModalCriarShow] = React.useState(false);
  const [modalEliminarShow, setModalEliminarShow] = React.useState(false);
  const [modalEditarPackShow, setModalEditarPackShow] = React.useState(false);
  const [selectedServico, setSelectedServico] = useState(null);
  const [subservico, setsubservico] = useState([]);
  var precosArray = [];

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
  useEffect(() => {
    api
      .get("/subservico/list")
      .then(({ data }) => {
        const dados = data.data;

        var newSubservicos = [];
        Object.keys(dados).map((key) => {
          dados[key].subservicos.map((subservicoAux) => {
            if (subservicoAux.servico.idServico == 2) {
              newSubservicos.push({
                nome: subservicoAux.nome,
                preco: subservicoAux.preco,
                idsubservico: subservicoAux.idsubservico,
                packs: subservicoAux.packs,
              });
            }
          });
        });
        setsubservico(newSubservicos);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  var servico = servicos?.servicos[2];
  const handleChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    precosArray[precosArray.indexOf(parseInt(e.target.id)) + 1] =
      e.target.value;
  };

  function Getdata(subservico) {
    precosArray.push(subservico.idsubservico);
    precosArray.push(subservico.preco);
    return (
      <>
        <div className="row">
          <div className="col-9">
            <p className="card-title">
              {subservico.nome} {"(ID" + " " + subservico.idsubservico + ")"}
            </p>
            <input
              className="form-control"
              id={subservico.idsubservico}
              type="text"
              required
              name="price"
              min="0"
              step=".01"
              defaultValue={subservico?.preco?.replace("$", "")}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </>
    );
  }
  //no sendupdate percorrer todos os subservicos, e para cada subservico ir
  //buscar o preço de cada um e dar um update
  function SendUpdate() {
    let success = true;
    let updatedSubservico;
    subservico.map((subservico) => {
      updatedSubservico = subservico;
      updatedSubservico.preco =
        precosArray[precosArray.indexOf(parseInt(subservico.idsubservico)) + 1];

      api
        .put(
          "/pedidos/updatepedido/" + subservico.idsubservico,
          updatedSubservico
        )
        .then((data) => {
          if (data.status != "200") {
            success = false;
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
    if (success) {
      toast.success("Todos os subserviços alterados com sucesso", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <div className="card w-100 h-auto g-1" style={{ marginLeft: "5em" }}>
        <div class="card-header">Altere o preço de cada subservico</div>
        <div className="card-body">
          <img
            className="float-end"
            src={servico?.imagem}
            style={{ width: "200px", height: "auto" }}
            alt=""
          />
          {servico?.subservicos.map((subservico) => Getdata(subservico))}
          <button className="btn btn-warning w-75 mt-3" onClick={SendUpdate}>
            Guardar preço{" "}
          </button>
        </div>
        <div class="card-footer">
          <button
            onClick={() => {
              setModalCriarShow(true);
            }}
            type="button"
            className="btn btn-success"
          >
            Criar subserviço
          </button>
          <button
            onClick={() => {
              setModalEliminarShow(true);
            }}
            type="button"
            className="btn btn-outline-danger"
          >
            Eliminar subserviço
          </button>

          <ModalCriarSubservico
            show={modalCriarShow}
            onHide={() => setModalCriarShow(false)}
            servico={servico}
          />

          <ModalEliminarSubservico
            show={modalEliminarShow}
            onHide={() => setModalEliminarShow(false)}
            servico={servico}
          />
        </div>
      </div>
    </>
  );
}
