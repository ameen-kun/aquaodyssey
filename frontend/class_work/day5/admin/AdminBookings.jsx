import { Container } from 'react-bootstrap'
import AdminNavbar from '../../components/AdminNavbar'
import AdminBookingCard from '../../components/AdminBookingCard'
import { useEffect, useRef } from 'react';

function AdminBookings() {
  const fadeRefs = useRef([]);

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
    <AdminNavbar idx="3" />
    <div className="page-container justify-content-center align-items-center d-flex flex-column">
      <br />
      <br />
      <div  ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
      <h2 style={{ fontFamily: "Parisienne" }} >All Bookings</h2>
        <hr />
        <Container className='d-flex flex-column align-items-center' >
        <AdminBookingCard/>
        <AdminBookingCard/>
        </Container>
      </div>
      <br />
      <br />
      </div>
      </div>
  )
}

export default AdminBookings