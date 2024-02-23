import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../assets/styles/navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";


function AdminNavbar(props) {
	const nav=useNavigate();
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
					<Nav>
						<Nav.Link className="mx-2" active={props?.idx === "1"}>
							<Link to="/home">Home</Link>
						</Nav.Link>
						<Nav.Link className="mx-2"active={props?.idx === "2"}>
							<Link to="/boats">Boats</Link>
						</Nav.Link>
						<Nav.Link className="mx-2" active={props?.idx === "3"}>
							<Link to="/bookings">Bookings</Link>
						</Nav.Link>
						<Nav.Link className="mx-2" active={props?.idx === "4"}>
							<Link to="/transactions">Transactions</Link>
						</Nav.Link>
						<Nav.Link className="mx-2" active={props?.idx === "5"}>
							<Link to="/blogs">Blogs</Link>
						</Nav.Link>
						<Nav.Link className="mx-2" active={props?.idx === "6"}>
							<Link to="/profile">Profile</Link>
						</Nav.Link>
						<Nav.Link className="mx-2">
							<LogoutIcon onClick={()=>nav("/")} className="nav-logout" />
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default AdminNavbar;
