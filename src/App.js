import { useState, useEffect, useContext } from 'react';
import { DevicesContext } from './context/deviceContext';
import './App.css';
import { getAxios, deleteAxios } from './axiosCalls/axios';
import { AddModal } from './bootstrapComponents/modals/postModal';
import { PutModal } from './bootstrapComponents/modals/putModal';
import {
  ListGroup,
  Row,
  Col,
  Container,
  Button,
  Dropdown,
} from 'react-bootstrap';

function App() {
  const { devices, setDevices } = useContext(DevicesContext);
  const [addModal, setAddModal] = useState(false);
  const [putModal, setPutModal] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    sort: 'HDD Capacity',
  });

  function handleDelete(id) {
    deleteAxios(id).then(() =>
      getAxios().then((res) => {
        setDevices(res);
      })
    );
  }

  function handleFilters() {
    getAxios().then((res) => {
      if (filters.type !== 'All') {
        res = res.filter((device) => device.type === filters.type);
      }

      if (filters.sort === 'HDD Capacity') {
        res.sort((a, b) => b.hdd_capacity - a.hdd_capacity);
      } else if (filters.sort === 'System Name') {
        res.sort(function (a, b) {
          if (a.system_name < b.system_name) {
            return -1;
          }
          if (a.system_name > b.system_name) {
            return 1;
          }
          return 0;
        });
      }
      setDevices(res);
    });
  }

  function handleDeviceTypeFilter(eventKey) {
    setFilters({ ...filters, type: eventKey });
  }

  function handleSortByFilter(eventKey) {
    setFilters({ ...filters, sort: eventKey });
  }

  useEffect(() => {
    handleFilters();
  }, [filters]);

  return (
    <div className="App">
      <Container className="fixed-top">
        <Row>
          <Col>
            <AddModal show={addModal} onHide={() => setAddModal(false)} />
          </Col>
          <Col className="headerButtons">
            <h6>Filter By:</h6>
            <Dropdown onSelect={(eventKey) => handleDeviceTypeFilter(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {filters.type === null ? 'Device Type' : filters.type}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" eventKey="All">
                  All
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="WINDOWS_WORKSTATION">
                  Windows Workstation
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="MAC">
                  Mac
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="WINDOWS_SERVER">
                  Windows Server
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="headerButtons">
            <h6>Sort By:</h6>

            <Dropdown onSelect={(eventKey) => handleSortByFilter(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {filters.sort === ' HDD Capacity'
                  ? 'HDD Capacity:'
                  : filters.sort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" eventKey="HDD Capacity">
                  HDD Capacity
                </Dropdown.Item>
                <Dropdown.Item href="#" eventKey="System Name">
                  System Name
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
      <Container id="container-body">
        <Row>
          <Col>
            <ListGroup>
              {devices.map((element) => (
                <ListGroup.Item key={element.id}>
                  <Row>
                    <Col>
                      <strong>{element.system_name}</strong>
                      <br />
                      <strong className="highlight">{element.type}</strong>
                      <br />
                      <strong>{element.hdd_capacity} GB</strong>
                    </Col>
                    <Col className="text-center">
                      <PutModal
                        show={putModal}
                        onHide={() => setPutModal(false)}
                        id={element.id}
                        system_name={element.system_name}
                        hdd_capacity={element.hdd_capacity}
                        type={element.type}
                      />
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(element.id)}
                      >
                        DELETE
                      </Button>{' '}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
