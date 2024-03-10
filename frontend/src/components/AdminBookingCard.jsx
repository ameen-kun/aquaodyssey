import { Card } from 'react-bootstrap'

function AdminBookingCard({booking}) {
  return (
    <Card className="my-5">
    <Card.Body>
        <Card.Text>
            <h4 style={{ fontFamily: "Parisienne" }}>{booking.boatName}</h4>
            <p><strong>Booking ID: </strong>{booking.id}</p>
            <p><strong>By User: </strong>{booking.bookedBy}</p>
            <p ><strong>From: </strong>{new Date(booking.startingDate).toDateString()}</p>
            <p><strong>To: </strong>{new Date(booking.endDate).toDateString()}</p>
            <p><strong>Price: </strong>${booking.price}</p>
            <p><strong>Booked On: </strong>{new Date(booking.bookedOn).toDateString()}</p>
            <p><strong>Status: </strong>{booking.status===0?"Added":booking.status===1?"Confirmed":"Completed"}</p>
        </Card.Text>
    </Card.Body>
</Card>
  )
}

export default AdminBookingCard