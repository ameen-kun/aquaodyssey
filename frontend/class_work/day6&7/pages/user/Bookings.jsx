import { Col, Offcanvas, Row } from 'react-bootstrap'
import BookingCard from '../../components/BookingCard'
import CustomNavbar from '../../components/CustomNavbar'
import BookingConfirmationCard from '../../components/BookingConfirmationCard'
import { useEffect, useRef, useState } from 'react';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { url } from '../../util/util';
import Footer from '../../components/Footer';
import Loading from '../Loading';

function Bookings() {
	const fadeRefs = useRef([]);
	const [show, setShow] = useState(false);
	const token = useSelector((state) => state.login.token);
	const [addedBookings, setAddedBookings] = useState([])
	const [oldBookings, setOldBookings] = useState([])
	const [upcomingBookings, setUpcomingBookings] = useState([])
	const [isLoading,setLoading]=useState(true);

	useEffect(() => {
		axios.get(`${url}/api/user/bookings/${token}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => {
				const allBookings = [...res.data]
				console.log(allBookings)
				setAddedBookings(allBookings.filter((i) =>
					i.status === 0))
				setOldBookings(allBookings.filter((i) =>
					i.status === 2))
				setUpcomingBookings(allBookings.filter((i) =>
					i.status === 1))
			})
			.catch((e) => {
				console.log(e)
			})
			setTimeout(()=>{
				setLoading(false)
			},1000)
	}, [])


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

	if(isLoading)
	return(
			<Loading/>
		)

	return (
		<div>
			<CustomNavbar idx="2" />
			<ViewSidebarIcon onClick={() => setShow(true)} className="text-white position-fixed mt-5" />
			<Offcanvas scroll={true} backdrop={true} show={show} onHide={() => setShow(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Navigate</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className="sidebar-list">
						<li>
							<a href="#about">About Us</a>
						</li>
						<li>
							<a href="#upcoming">Upcoming Rides</a>
						</li>
						<li>
							<a href="#pending">Pending Confirmation</a>
						</li>
						<li>
							<a href="#completed">Completed Rides</a>
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
				<div id="upcoming" ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h3 style={{ fontFamily: "Parisienne" }}>Upcoming Rides!</h3>
					<hr />
					<Row className='mt-3'>
						{upcomingBookings.length > 0 ? (
							upcomingBookings.map((i) => {
								return (
									<Col md="4" key={i.id} data-aos="fade-up">
										<BookingCard booking={i} />
									</Col>
								)
							})
						) : (
							<>
								<h4 className='m-5'>No Upcoming Rides!</h4>
							</>
						)}
					</Row>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div id="pending" ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h3 style={{ fontFamily: "Parisienne" }}>Rides to be Confirmed!</h3>
					<hr />
					<Row className='mt-3'>
						{addedBookings.length > 0 ? (
							addedBookings.map((i) => {
								return (
									<Col md="4" key={i.id} data-aos="fade-up">
										<BookingConfirmationCard booking={i} />
									</Col>
								)
							})
						) : (
							<>
								<h4 className='m-5'>No Bookings Done Yet!</h4>
							</>
						)}
					</Row>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div id="completed" ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h3 style={{ fontFamily: "Parisienne" }}>Completed Rides!</h3>
					<hr />
					<Row className='mt-3'>
						{oldBookings.length > 0 ? (
							oldBookings.map((i) => {
								return (
									<Col md="4" key={i.id} data-aos="fade-up">
										<BookingCard booking={i} />
									</Col>
								)
							})
						) : (
							<>
								<h4 className='m-5'>No Rides Completed Yet!</h4>
							</>
						)}
					</Row>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
			<Footer/>
		</div>
	)
}

export default Bookings