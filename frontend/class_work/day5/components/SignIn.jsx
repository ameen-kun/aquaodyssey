import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { Person4Outlined } from "@mui/icons-material";
import { LockOutlined } from "@mui/icons-material";

function SignIn(props) {
	const nav = useNavigate();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [valids, setValids] = useState({});

	const submitForm = (e) => {
		e.preventDefault();
		if (validateForm()) {
			nav("/home");
		}
	};
	const validateForm = () => {
		var isValid = true;
		const currerr = {};
		const currval = {};
		if (username === "") {
			currerr.uname = "Invalid Username";
			isValid = false;
		} else {
			currval.uname = username;
		}
		if (
			!validator.isStrongPassword(password, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			currerr.password = "Invalid Password";
			isValid = false;
		} else {
			currval.password = password;
		}
		setErrors(currerr);
		setValids(currval);
		return isValid;
	};
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Form noValidate className="loginForm" onSubmit={submitForm}>
				<Modal.Header closeButton>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="mb-3">
						<Form.Group controlId="uname">
							<Form.Label>Username</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text id="basic-addon1">
									<Person4Outlined />
								</InputGroup.Text>
								<Form.Control
									type="text"
									isValid={!!valids.uname}
									isInvalid={!!errors.uname}
									placeholder="Username"
									value={username}
									onChange={(e) => {
										setUserName(e.target.value);
									}}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.uname}
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
									isValid={!!valids.password}
									isInvalid={!!errors.password}
									placeholder="Password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Row>
						<Form.Group controlId="sumbit">
							<Button id="login-button" variant="outline-dark" type="submit">
								Sign In
							</Button>
						</Form.Group>
					</Row>
					<Row>
						<Form.Text
							style={{ cursor: "pointer" }}
							onClick={props.handleSwitch}>
							New Here? Sign Up.
						</Form.Text>
					</Row>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default SignIn;
