import AdminNavbar from '../../components/AdminNavbar'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import AdminBoatCard from '../../components/AdminBoatCard';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { url } from '../../util/util';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Loading from '../Loading';

function AdminBoats() {
	const [isLoading,setLoading]=useState(true);
	const token=useSelector((state)=>state.login.token)
	const [boats,setBoats]=useState([]);
	const fadeRefs = useRef([]);

	useEffect(()=>{
		axios.get(`${url}/api/admin/boats`,{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res)=>{
			setBoats(res.data);
		})
		.catch((e)=>{
			console.log(e)
		})

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

	const [showModal, setShowModal] = useState(false);
	const [newBoat, setNewBoat] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewBoat((prevBoat) => ({
			...prevBoat,
			[name]: value
		}));
	};

	const handleSave = () => {
		if(!newBoat.available) newBoat.available=false
		try{
			axios.post(`${url}/api/admin/boat`,newBoat,{
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setShowModal(false);
		}
		catch(e){
			console.log(e);
		}
	};


if(isLoading){
	return(
		<Loading/>
	)
}

	return (
		<div>
			<AdminNavbar idx="2" />
			<Modal show={showModal} onHide={() => setShowModal(false)}>
          <Form onSubmit={handleSave}>
        <Modal.Header closeButton>
          <Modal.Title>Add Boat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formBasicName" className='mt-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newBoat.name}
                onChange={handleChange}
				required
              />
            </Form.Group>
            <Form.Group controlId="formBasicType"className='mt-2'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={newBoat.type}
                onChange={handleChange}
				required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCapacity"className='mt-2'>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={newBoat.capacity}
                onChange={handleChange}
				required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPrice"className='mt-2'>
              <Form.Label>Price per Day</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newBoat.price}
                onChange={handleChange}
				required
              />
            </Form.Group>
            <Form.Group controlId="formBasicImageUrl"className='mt-2'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageloc"
                value={newBoat.imageloc}
                onChange={handleChange}
				required
              />
            </Form.Group>
            <Form.Group controlId="formBasicAvailability"className='mt-2'>
              <Form.Check
                type="checkbox"
                name="availability"
                label="Available"
                checked={newBoat.available}
                onChange={() => setNewBoat(prevBoat => ({ ...prevBoat, available: !prevBoat.available }))}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="outline-dark" type="submit" >Add Boat!</Button>
        </Modal.Footer>
          </Form>
      </Modal>
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Add a Boat</h2>
					<Button data-aos="fade-up" variant="outline-light" className='m-3' onClick={()=>setShowModal(true)}>Add Boat!</Button>
					<hr />
				</div>
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >View Boats</h2>
					<hr />
					<Row className='mt-3'>
						{boats.length>0?(
							boats.map((i)=>{
								return(
									<Col key={i.id} md="4"data-aos="fade-up">
									<AdminBoatCard boat={i}/>
								</Col>
							);
						})
						):(
							<>
							<h4 className='m-5'>No Boats Added Yet!</h4>
							<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
							</>
						)}
					</Row>
				</div>
				<br />
				<br />
				<br />
				<br />
			</div>
			<Footer/>
		</div>
	)
}

export default AdminBoats