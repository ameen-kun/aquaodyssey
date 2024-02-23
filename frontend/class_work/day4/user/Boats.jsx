import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import CustomNavbar from '../../components/CustomNavbar';
import { Container } from 'react-bootstrap';
import BoatCard from '../../components/BoatCard';
const boat = {
    id: 1,
    name: 'Speedy Cruiser',
    type: 'Cruiser',
    capacity: 6,
    price: '$200/hour',
    image: "src/assets/images/scenic_cruise.jpg"
  };
  

function Boats() {
    const loc=useLocation();
    const date=loc.state;
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
    <>
    <CustomNavbar idx="1"/>
    <div className="page-container justify-content-center align-items-center d-flex flex-column">
        <br/>
        <div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Boats</h2>
					<hr />
                    <Container className='d-flex flex-column align-items-center' >
							<BoatCard boat={boat}/>
							<BoatCard boat={boat}/>
				</Container>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
    </>

  )
}

export default Boats