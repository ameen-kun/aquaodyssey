import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { url } from '../util/util';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BoatCard({ boat, date }) {
  const nav=useNavigate();
  const token = useSelector((state) => state.login.token)
  const handleBooking = () => {
    axios.post(`${url}/api/user/booking`,{
      "token": token,
      "bookedOn": new Date(),
      "startingDate": new Date(date[0].$d),
      "endDate": new Date(date[1].$d),
      "price": boat.bookingPrice,
      "boatId": boat?.boat.id
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .catch(e => console.log(e))
    nav("/bookings")
    window.scrollTo(0,0)
  }
  return (
    <Card className='my-5'>
      <Card.Img variant="top" height="250px" className="rounded" src={boat?.boat.imageloc} />
      <Card.Body>
        <Card.Title style={{ fontFamily: "Parisienne" }}>
          {boat?.boat.name}
        </Card.Title>
        <Card.Text>
          <p>
            Type: {boat?.boat.type} <br />
          </p>
          <p>
            Capacity: {boat?.boat.capacity} <br />
          </p>
          <p>
            Price: ${boat?.boat.price}/Day<br />
          </p>
          <p>
            <strong>Booking Price: ${boat.bookingPrice}</strong>
          </p>
        </Card.Text>
        <Button variant='outline-dark' onClick={() => handleBooking()}>Book Now</Button>
      </Card.Body>
    </Card>
  );
}


export default BoatCard;
