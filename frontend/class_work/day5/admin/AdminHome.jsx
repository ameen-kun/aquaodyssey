import  { useEffect, useRef, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import "../../assets/styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function AdminHome() {
	const fadeRefs = useRef([]);
	const [selectedDate,setSelectedDate]=useState([]);
	const nav=useNavigate();

	useEffect(() => {


		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("fade-in");
				} else {
					entry.target.classList.remove("fade-in");
				}
			});
		});

		fadeRefs.current.forEach((ref) => {
			observer.observe(ref);
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div>
			<AdminNavbar idx="1" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div
					ref={(el) => fadeRefs.current.push(el)}
					className="text-white rounded p-3 w-75 fade-item">
					<Container>
						<Row>
							<Col className="mt-5">
								<h1 style={{ fontFamily: "Parisienne" }}>
									Welcome Admin!
								</h1>
								<br />
								<h6 >
                                    Manage users, boats, blogs and monitor bookings and transactions...
									<br />
								</h6>
							</Col>
						</Row>
					</Container>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}

export default AdminHome;
