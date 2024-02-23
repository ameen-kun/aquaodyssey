import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../assets/styles/navbar.css";

function LandingNav(props) {
	return (
		<Navbar
			expand="lg"
			variant="dark"
			style={{ backgroundColor: "rgba(0,0,0,.93)" }}>
			<Container>
				<Navbar.Brand>
					<h1 style={{ fontFamily: "Parisienne" }}>Aqua Odyssey</h1>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link onClick={props.handleSignUp}>SignUp</Nav.Link>
						<Nav.Link onClick={props.handleSignIn}>SignIn</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default LandingNav;
