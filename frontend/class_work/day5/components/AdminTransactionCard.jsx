import { Card,Container, Row } from 'react-bootstrap'

function AdminTransactionCard() {
  return (
    <Container className="m-3">
        <Card>
            <Row>
                <Card.Body>
                    <Card.Text className='mx-3'>
                        <h5 >Transaction  ID: </h5>
                        <h5 >Booking ID: </h5>
                        <h5 >By User: </h5>
                        <h5 >Status: </h5>
                        <h5 >On: </h5>
                        <h5 >Price: </h5>
                    </Card.Text>
                </Card.Body>
            </Row>
        </Card>
    </Container>
  )
}
export default AdminTransactionCard