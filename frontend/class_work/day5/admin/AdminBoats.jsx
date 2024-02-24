import AdminNavbar from '../../components/AdminNavbar'
import { Button, Container } from 'react-bootstrap'
import AdminBoatCard from '../../components/AdminBoatCard';
import { useEffect, useRef } from 'react';

function AdminBoats() {
  const boat = {
    id: 1,
    name: 'Speedy Cruiser',
    type: 'Cruiser',
    capacity: 6,
    price: '$200/hour',
    image: "src/assets/images/scenic_cruise.jpg"
  };
  
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
			<AdminNavbar idx="2" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Add a Boat</h2>
            <Button variant="outline-light" className='m-3'>Add Boat!</Button>
					<hr />
        </div>
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >View Boats</h2>
					<hr />
          <Container className='d-flex flex-column align-items-center' >
							<AdminBoatCard boat={boat}/>
							<AdminBoatCard boat={boat}/>
				</Container>
          </div>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>
      </div>
  )
}

export default AdminBoats