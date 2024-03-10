import { Container, Row, Col } from "react-bootstrap";
function Footer() {
	return (
		<footer
		id="about"
			className="p-4 text-white"
			style={{ backgroundColor: "rgba(0,0,0,.93)" }}>
			<Container>
				<Row>
					<Col md={6}>
						<h5>About Us</h5>
						<p>
							At Aqua Odyssey, we redefine living with unique waterfront
							experiences, blending comfort and adventure. Join us on a journey
							where every moment is filled with tranquility and possibility.
						</p>
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
						<p>&copy; 2024 Aqua Odyssey</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;
