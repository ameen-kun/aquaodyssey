import { Card, Button } from 'react-bootstrap';

function BoatCard({ boat }) {
    console.log(boat);
  return (
    <Card className='w-50 my-5'>
      <Card.Img variant="top" src={boat?.image} />
      <Card.Body>
        <Card.Title style={{fontFamily:"Parisienne"}}>{boat?.name}</Card.Title>
        <Card.Text>
          Type: {boat?.type} <br />
          Capacity: {boat?.capacity} <br />
          Price: {boat?.price} <br />
        </Card.Text>
        <Button variant="primary" onClick={() => handleBooking(boat.id)}>Book Now</Button>
      </Card.Body>
    </Card>
  );
}

function handleBooking(boatId) {
  // Handle booking logic here
  console.log(`Booking boat with ID: ${boatId}`);
}

export default BoatCard;
