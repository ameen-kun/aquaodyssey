import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="p-4" style={{backgroundColor:'grey'}}>
      <Container>
        <Row>
          <Col md={6}>
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet est nec odio maximus dapibus.</p>
          </Col>
          <Col md={6}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: example@example.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Main St, City, Country</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Your Website</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer