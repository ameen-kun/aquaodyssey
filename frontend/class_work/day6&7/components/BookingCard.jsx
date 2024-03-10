import { Card } from "react-bootstrap"

function BookingCard({ booking }) {
    return (
        <Card className="my-5">
            <Card.Body>
                <Card.Text>
                    <h4 style={{ fontFamily: "Parisienne" }}>{booking.boatName}</h4>
                    <p><strong>Booking ID: </strong>{booking.id}</p>
                    <p ><strong>From: </strong>{new Date(booking.startingDate).toDateString()}</p>
                    <p><strong>To: </strong>{new Date(booking.endDate).toDateString()}</p>
                    <p><strong>Price: </strong>${booking.price}</p>
                    <p><strong>Booked On: </strong>{new Date(booking.bookedOn).toDateString()}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BookingCard