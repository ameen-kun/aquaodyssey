import  { useEffect, useRef, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../assets/styles/sidebar.css";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import Loading from "../Loading";

function AdminHome() {
	const fadeRefs = useRef([]);
	const [isLoading,setLoading]=useState(true);

	useEffect(()=>{
		setTimeout(()=>{
			setLoading(false)
		},1000)
	},[])

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
	}, [isLoading]);



if(isLoading){
	return(
		<Loading/>
	)
}

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
			<Footer/>
		</div>
	);
}

export default AdminHome;
