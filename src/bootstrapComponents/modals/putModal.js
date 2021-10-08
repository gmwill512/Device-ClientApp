import Modal from 'react-bootstrap/Modal';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { putAxios, getAxios } from '../../axiosCalls/axiosCalls';
import { DevicesContext } from '../../context/deviceContext';
import './putModal.css';

export function PutModal(props) {
  const { setDevices } = useContext(DevicesContext);
  const [show, setShow] = useState(false);
  const [localState, setLocalState] = useState({
    id: props.id,
    system_name: props.system_name,
    type: props.type,
    hdd_capacity: props.hdd_capacity,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    if (localState.system_name === '') {
      window.alert('Please Enter A System Name');
      setLocalState({ ...localState, system_name: props.system_name });
    } else if (localState.type === null) {
      window.alert('Please Enter A System Type');
    } else if (localState.hdd_capacity === undefined) {
      window.alert('Please Enter A HDD Capacity');
      setLocalState({ ...localState, system_name: props.hdd_capacity });
    } else {
      putAxios(localState, localState.id).then(() =>
        getAxios().then((res) => {
          setDevices(res);
          setShow(false);
        })
      );
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        EDIT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit HDD Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <Form className="putModal"></Form>
          <Form.Group className="mb-3" controlId="systemName">
            <Form.Control
              type="text"
              placeholder={localState.system_name}
              value={localState.system_name}
              onChange={(e) =>
                setLocalState({ ...localState, system_name: e.target.value })
              }
            />
          </Form.Group>
          <Dropdown
            onSelect={(eventKey) => {
              setLocalState({ ...localState, type: eventKey });
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {localState.type === null ? 'SELECT A TYPE' : localState.type}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" eventKey="WINDOWS_WORKSTATION">
                Windows Workstation{' '}
              </Dropdown.Item>
              <Dropdown.Item href="#" eventKey="WINDOWS_SERVER">
                Windows Server
              </Dropdown.Item>
              <Dropdown.Item href="#" eventKey="MAC">
                Mac
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group className="mb-3" controlId="hddCapacity">
            <Form.Control
              type="number"
              min="1"
              placeholder="Enter HDD Storage Size"
              value={localState.hdd_capacity}
              onChange={(e) =>
                setLocalState({ ...localState, hdd_capacity: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
