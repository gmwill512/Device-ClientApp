import { Dropdown } from 'react-bootstrap';

export function SortBy() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">All</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Capacity</Dropdown.Item>
        <Dropdown.Item href="#/action-3">System Name</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
