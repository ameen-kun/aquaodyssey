import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import validator from "validator";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { LockOutlined, Person4Outlined } from "@mui/icons-material";
import axios from "axios";
import { url } from "../util/util";

function SignUp(props) {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		cnfPassword: "",
		role: props.role
	});
	const [errors, setErrors] = useState({});

	const submitForm = (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				axios.post(`${url}/api/auth/signup`, form)
				console.log("Form submitted successfully");
				props.handleClose()
			}
			catch (e) {
				console.log(e);
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!validator.isAlpha(form.firstName))
			newErrors.firstName = "Invalid First Name";
		if (!validator.isAlpha(form.lastName))
			newErrors.lastName = "Invalid Last Name";
		if (!validator.isEmail(form.email)) newErrors.email = "Invalid E-mail";
		if (!form.username.trim()) newErrors.username = "Invalid Username";
		if (
			!validator.isStrongPassword(form.password, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		)
			newErrors.password =
				"Password must be at least 8 characters and contain at least one uppercase, one lowercase, one digit, and one special character";
		if (form.password !== form.cnfPassword)
			newErrors.cnfPassword = "Passwords do not match";
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return false;
		return true;
	};

	const handleChange = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});
	};

	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Form noValidate className="loginForm" onSubmit={submitForm}>
				<Modal.Header closeButton>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="mb-3">
						<Form.Group as={Col} md="6" controlId="fname">
							<Form.Label>First Name</Form.Label>
							<Form.Control
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
					<Row className="mb-3">
						<Form.Group controlId="uname">
							<Form.Label>Username</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text id="basic-addon1">
									<Person4Outlined />
								</InputGroup.Text>
								<Form.Control
									type="text"
									isValid={!!form.userName}
									isInvalid={!!errors.userName}
									placeholder="Username"
									value={form.userName}
									onChange={(e) => handleChange("username", e.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.userName}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text id="basic-addon1">
									<LockOutlined />
								</InputGroup.Text>
								<Form.Control
									type="password"
									isValid={!!form.password}
									isInvalid={!!errors.password}
									placeholder="Password"
									value={form.password}
									onChange={(e) => handleChange("password", e.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group controlId="cnfpassword">
							<Form.Label>Confirm Password</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text id="basic-addon1">
									<LockOutlined />
								</InputGroup.Text>
								<Form.Control
									type="password"
									isValid={!!form.cnfPassword}
									isInvalid={!!errors.cnfPassword}
									placeholder="Confirm Password"
									value={form.cnfPassword}
									onChange={(e) => handleChange("cnfPassword", e.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.cnfPassword}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Row>
				</Modal.Body>

				<Modal.Footer>
					<Row>
						<Form.Group controlId="sumbit">
							<Button id="signup-button" variant="outline-dark" type="submit">
								Sign Up
							</Button>
						</Form.Group>
					</Row>
					{props?.enableSwitch &&
						<Row>
							<Form.Text
								style={{ cursor: "pointer" }}
								onClick={props.handleSwitch}>
								Already Have an Account?
							</Form.Text>
						</Row>
					}
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default SignUp;
