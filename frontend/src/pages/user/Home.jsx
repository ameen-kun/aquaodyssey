import  { useEffect, useRef, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import { Container, Col, Row, Card, Button, Offcanvas } from "react-bootstrap";
import CustomDatePicker from "../../components/CustomDatePicker";
import weekendpic from "../../assets/images/weekend_getaway.jpg";
import cruisepic from "../../assets/images/scenic_cruise.jpg";
import fishingpic from "../../assets/images/fishing.jpg";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import "../../assets/styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Footer from "../../components/Footer";

function Home() {
	const [isLoading,setLoading]=useState(true);
	const fadeRefs = useRef([]);
	const [selectedDate,setSelectedDate]=useState([]);
	const nav=useNavigate();
	const [show,setShow]=useState(false);

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
		<>
			<CustomNavbar idx="1" />
		<ViewSidebarIcon onClick={()=>setShow(true)} className="text-white position-fixed mt-5"/>
		<Offcanvas scroll={true} backdrop={true} show={show} onHide={()=>setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigate</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
			<ul className="sidebar-list">
			<li>
			<a href="#about">About Us</a>
			</li>
			<li>
			<a href="#book">Book</a>
			</li>
			<li>
			<a href="#offers">Offers</a>
			</li>
			<li>
			<a href="#top">Back To Top</a>
			</li>
			</ul>
        </Offcanvas.Body>
      </Offcanvas>
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
									Welcome to Aqua Odyssey!
								</h1>
								<br />
								<h6 >
									Explore the world of boating with Aqua Odyssey.
									<br />
									Whether {"you're"} planning a relaxing weekend getaway, an
									adventurous fishing trip, or a scenic cruise, Aqua Odyssey has
									the perfect boat house for you.
									<br />
									Start your aquatic adventure today with Aqua Odyssey!
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
				<br />
				<div
				id="book"
					ref={(el) => fadeRefs.current.push(el)}
					className="text-white align-self-center rounded p-3 w-75 fade-item">
					<Container>
						<h3 style={{ fontFamily: "Parisienne" }}>Float with Us!</h3>
						<hr />
						<Row className="mb-3">
							<h6>
								Let Us Know About your Dates!
							</h6>
						</Row>
						<div className="d-flex flex-column align-items-center">
							<CustomDatePicker onDateChange={setSelectedDate}/>
							<Button className="m-3 mt-4" variant="outline-light" onClick={()=>{nav("/boats",{state:{selectedDate}});window.scrollTo(0,0)}}>
								Get boats!
							</Button>
						</div>
					</Container>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div
				id="offers"
					ref={(el) => fadeRefs.current.push(el)}
					className="text-white align-self-center rounded p-3 w-75 fade-item">
					<Container className="mb-3">
						<h3 style={{ fontFamily: "Parisienne" }}>Our Offers!</h3>
						<hr />
						<Row className="mt-3">
							<Col md={4} data-aos="fade-up">
								<Card className="mt-3">
									<Card.Img variant="top" src={weekendpic} />
									<Card.Body>
										<Card.Title>Weekend Getaway</Card.Title>
										<Card.Text className="mb-3">
											Enjoy a relaxing weekend on one of our luxurious boats.
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} data-aos="fade-up">
								<Card className="mt-3">
									<Card.Img variant="top" src={fishingpic} />
									<Card.Body>
										<Card.Title>Fishing Adventure</Card.Title>
										<Card.Text className="mb-3">
											Embark on an adventurous fishing trip with our experienced
											guides.
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} data-aos="fade-up">
								<Card className="mt-3">
									<Card.Img variant="top" src={cruisepic} />
									<Card.Body>
										<Card.Title>Scenic Cruise</Card.Title>
										<Card.Text className="mb-3">
											Cruise along breathtaking coastlines and enjoy the scenic
											views.
										</Card.Text>
									</Card.Body>
								</Card>
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
			</div>
			<Footer/>
		</>
	);
}

export default Home;
