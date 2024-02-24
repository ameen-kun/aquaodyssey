import { Card, Col, Container, Row } from "react-bootstrap"
import lakeBoat from "../assets/images/lake_boat.jpg"
function BookingCard() {
  return (
    <Container  className="m-3">
        <Card>
            <Row>
                <Col md={3}>
                    <Card.Img className="m-3" src={lakeBoat}/>
                </Col>
                <Col md={9}>
                <Card.Body>
                    <Card.Text>
                        <h4 style={{fontFamily:"Parisienne"}}>Boat Type : </h4>
                        <h5 >Booking ID: </h5>
                        <h5 >From: To:</h5>
                        <h5 >Price: </h5>
                    </Card.Text>
                </Card.Body>
                </Col>
            </Row>
        </Card>
    </Container>
  )
}

export default BookingCard