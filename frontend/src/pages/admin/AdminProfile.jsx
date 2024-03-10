import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import validator from "validator";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Button } from "react-bootstrap";
import AdminNavbar from "../../components/AdminNavbar";
import SignUp from "../../components/SignUp";
import axios from "axios";
import { url } from "../../util/util";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Loading from "../Loading";

function AdminProfile() {
	const token=useSelector((state)=>state.login.token)
	const [showSignUp, setShowSignUp] = useState(false);
	const handleCloseSignUp = () => setShowSignUp(false);
	const handleShowSignUp = () => setShowSignUp(true);
	const fadeRefs = useRef([]);
	const [isLoading,setLoading]=useState(true);

	useEffect(()=>{
		axios.get(`${url}/api/admin/user/${token}`,{
			headers:{
				Authorization:`Bearer ${token}`
			}
		})
		.then((res)=>{
			setForm(res.data)
		})
		.catch((e)=>console.log(e))

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

	const [enabled, setEnabled] = useState(false);
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const [temp, setTemp] = useState({});

	const submitForm = (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				axios.put(`${url}/api/admin/updateUser`, {
					"token": token,
					"firstName": form.firstName,
					"lastName": form.lastName,
					"email": form.email
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
			}
			catch (e) {
				console.log(e)
			}
			setEnabled(false);
			
		}
	};

	const validateForm = () => {
		console.log(form);
		const newErrors = {};
		if (!validator.isAlpha(form.firstName))
		newErrors.firstName = "Invalid First Name";
		if (!validator.isAlpha(form.lastName))
			newErrors.lastName = "Invalid Last Name";
		if (!validator.isEmail(form.email)) newErrors.email = "Invalid E-mail";
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return false;
		return true;
	};
	const editDetails = () => {
		if (!enabled) {
			setTemp(form);
			setEnabled(true);
		}
		else {
			setForm(temp);
			setErrors({})
			setEnabled(false);
		}
		
	}
	const handleChange = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});
	};
	if(isLoading){
			return(
				<Loading/>
			)
		}

	return (
		<div>
			<AdminNavbar idx="6" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Your Profile</h2>
					<hr />
					<Form noValidate className="loginForm" onSubmit={submitForm} data-aos="fade-up">
						<Row className="mb-3">
							<Form.Group as={Col} md="6" controlId="cfname">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									disabled={!enabled}
									isValid={!!form.firstName}
									isInvalid={!!errors.firstName}
									type="text"
									placeholder="First Name"
									value={form.firstName}
									onChange={(e) => handleChange("firstName", e.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="clname">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									disabled={!enabled}
									isValid={!!form.lastName}
									isInvalid={!!errors.lastName}
									type="text"
									placeholder="Last Name"
									value={form.lastName}
									onChange={(e) => handleChange("lastName", e.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.lastName}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group controlId="cemail">
								<Form.Label>E-mail</Form.Label>
								<InputGroup className="mb-3">
									<InputGroup.Text id="basic-addon1">
										<EmailOutlinedIcon />
									</InputGroup.Text>
									<Form.Control
										disabled={!enabled}
										type="email"
										isValid={!!form.email}
										isInvalid={!!errors.email}
										placeholder="example@demo.com"
										value={form.email}
										onChange={(e) => handleChange("email", e.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Button className="m-2" variant={!enabled && "outline-light" || enabled && "danger"} onClick={editDetails}>{!enabled && "Edit" || enabled && "Cancel"}</Button>
						{enabled &&
							<Button className="m-2" variant="outline-light" type="submit">Save</Button>
						}
					</Form>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Create Admin Account</h2>
					<hr />
					<Button variant="outline-light" className="m-3" data-aos="fade-up" onClick={handleShowSignUp}>Create!</Button>
					<SignUp
						enableSwitch={false}
						show={showSignUp}
						handleClose={handleCloseSignUp}
						role="ADMIN"
					/>
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
	);
}

export default AdminProfile;
