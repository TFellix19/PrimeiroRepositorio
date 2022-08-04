//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Modalvertical({pedido, show, onHide}) {
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Informação do pedido {pedido?.idpedidos}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <p>Nome: {pedido?.cliente?.nome}</p>
              <p>Email: {pedido?.cliente?.email}</p>
              <p>Contacto: {pedido?.cliente?.contacto}</p>
              <p>Estado do pedido: {pedido?.estado}</p>
              <p>Detalhes do pedido: {pedido?.detalhes}</p>
              <p>Data: {pedido?.data}</p>
              <p>Subserviço: {pedido?.subservico?.nome}</p>
        </Modal.Body>
        <Modal.Footer>
      
        </Modal.Footer>
      </Modal>
    );
  }