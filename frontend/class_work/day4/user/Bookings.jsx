import { Container, Offcanvas } from 'react-bootstrap'
import BookingCard from '../../components/BookingCard'
import CustomNavbar from '../../components/CustomNavbar'
import BookingConfirmationCard from '../../components/BookingConfirmationCard'
import { useEffect,useRef, useState } from 'react';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

function Bookings() {
	const fadeRefs = useRef([]);
	const [show,setShow]=useState(false);
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
      <CustomNavbar idx="2" />
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
						<h3 style={{ fontFamily: "Parisienne"}}>Upcoming Rides!</h3>
						<hr />
				<Container className='d-flex flex-column align-items-center' >
							<BookingCard/>
							<BookingCard/>
				</Container>
				</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<div id="pending" ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
						<h3 style={{ fontFamily: "Parisienne"}}>Rides to be Confirmed!</h3>
						<hr />
				<Container className='d-flex flex-column align-items-center' >
							<BookingConfirmationCard/>
							<BookingConfirmationCard/>
				</Container>
				</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<div id="completed" ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
						<h3 style={{ fontFamily: "Parisienne"}}>Completed Rides!</h3>
						<hr />
				<Container className='d-flex flex-column align-items-center' >
							<BookingCard/>
							<BookingCard/>
				</Container>
				</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			</div>
    </div>
  )
}

export default Bookings