import axios from 'axios';
import { useState } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { url } from '../util/util';

function AdminBoatCard({ boat }) {
  const [showModal, setShowModal] = useState(false);
  const [editedBoat, setEditedBoat] = useState({ ...boat });
  const token = useSelector((state) => state.login.token)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBoat((prevBoat) => ({
      ...prevBoat,
      [name]: value
    }));
  };

  const handleSave = () => {
    try {
      axios.put(`${url}/api/admin/boat/${boat.id}`, editedBoat, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(editedBoat);
      setShowModal(false);
    }
    catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    try {
      axios.delete(`${url}/api/admin/boat/${boat.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.location.reload();
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Card className='my-5'>
        <Card.Img variant="top" className='rounded' height="250px" src={boat?.imageloc} />
        <Card.Body>
          <Card.Title style={{ fontFamily: "Parisienne" }}>
            {boat.name}
          </Card.Title>
          <Card.Text>
            <p>
              Type: {boat.type} <br />
            </p>
            <p>
              Capacity: {boat.capacity} <br />
            </p>
            <p>
              Price: ${boat.price}/Day<br />
            </p>
            <p>
              Availability: {boat.available ? 'Available' : 'Not Available'} <br />
            </p>
          </Card.Text>
          <Button variant="outline-dark" className='m-2' onClick={() => setShowModal(true)}>Edit</Button>
          <Button variant="danger" className='m-2' onClick={() => handleDelete()}>Delete</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Boat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicName" className='mt-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedBoat.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicType" className='mt-2'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={editedBoat.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCapacity" className='mt-2'>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={editedBoat.capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPrice" className='mt-2'>
              <Form.Label>Price per Day</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editedBoat.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicImageUrl" className='mt-2'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageloc"
                value={editedBoat.imageloc}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicAvailability" className='mt-2'>
              <Form.Check
                type="checkbox"
                name="availability"
                label="Available"
                checked={editedBoat.available}
                onChange={() => setEditedBoat(prevBoat => ({ ...prevBoat, available: !prevBoat.available }))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="outline-dark" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminBoatCard;
