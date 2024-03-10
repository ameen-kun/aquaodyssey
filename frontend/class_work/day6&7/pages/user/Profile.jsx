import CustomNavbar from "../../components/CustomNavbar";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import validator from "validator";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Button } from "react-bootstrap";
import TransactionCard from "../../components/TransactionCard";
import axios from "axios";
import { url } from "../../util/util";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Loading from "../Loading";

function Profile() {
	const [isLoading,setLoading]=useState(true);
	const fadeRefs = useRef([]);
	const token = useSelector((state) => state.login.token)
	const [transactions,setTransactions] = useState([]);

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

	useEffect(()=>{
		axios.get(`${url}/api/user/user/${token}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => {
				setForm(res.data)
			})
		axios.get(`${url}/api/user/transactions/${token}`,{
			headers:{
				Authorization:`Bearer ${token}`
			}
		})
		.then((res)=>setTransactions(res.data))

		setTimeout(()=>{
			setLoading(false)
		},1000)
	},[])

	const [enabled, setEnabled] = useState(false);
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const [temp, setTemp] = useState({});

	const submitForm = (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				axios.put(`${url}/api/user/updateUser`, {
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
			<CustomNavbar idx="4" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Your Profile</h2>
					<hr />
					<Form noValidate className="loginForm" onSubmit={submitForm} data-aos="fade-up">
						<Row className="mb-3" >
							<Form.Group as={Col} md="6" controlId="fname">
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
							<Form.Group as={Col} md="6" controlId="lname">
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
							<Form.Group controlId="email">
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
					<h2 style={{ fontFamily: "Parisienne" }} >Your Transactions</h2>
					<hr />
					<Row className='mt-3'>
						{transactions.length > 0 ? (
							transactions.map((i) => {
								return (
									<Col md="4" key={i.id} data-aos="fade-up">
										<TransactionCard transaction={i} />
									</Col>
								)
							})
						) : (
							<>
								<h4 className='m-5'>No Transactions Performed Yet!</h4>
								<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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

export default Profile;
