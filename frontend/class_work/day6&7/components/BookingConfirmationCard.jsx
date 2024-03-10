import { Button, Card } from "react-bootstrap";
import { payment } from "../util/payment";
import axios from "axios";
import { url } from "../util/util";
import { useSelector } from "react-redux";

function BookingConfirmationCard({ booking }) {

	const token = useSelector((state) => state.login.token)

	const initiateTransaction = async () => {
		var flag = false;
		await axios.post(`${url}/api/user/transaction`, {
			token: token,
			bookingId: booking.id,
			transactionDate: new Date()
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => {
				payment(res.data, booking.price, token)
				flag = true
			}
			)
			.catch(e => console.log(e))
		if (flag) {
			await axios.put(`${url}/api/user/booking`, {
				token: token,
				bookingId: booking.id
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
		}
		window.location.reload();
		window.scrollTo(0,0)
	}

	const handleDelete = async () => {
		await axios.put(`${url}/api/user/booking/delete`, {
			token: token,
			bookingId: booking.id
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		window.location.reload();
		window.scrollTo(0,0)
	}

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
				<Button className="m-2" variant="outline-dark" onClick={() => initiateTransaction()}>
					Confirm & Pay
				</Button>
				<Button className="m-2" variant="danger" onClick={() => handleDelete()}>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
}

export default BookingConfirmationCard;
