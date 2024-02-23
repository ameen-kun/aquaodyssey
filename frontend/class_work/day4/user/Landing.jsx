import "../../assets/styles/landing.css";
import LandingNav from "../../components/LandingNav";
import SignIn from "../../components/SignIn";
import { useState } from "react";
import SignUp from "../../components/SignUp";

function Landing() {
	const [showSignIn, setShowSignIn] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const handleCloseSignIn = () => setShowSignIn(false);
	const handleShowSignIn = () => setShowSignIn(true);
	const handleCloseSignUp = () => setShowSignUp(false);
	const handleShowSignUp = () => setShowSignUp(true);
	const handleSwitch = () => {
		if (showSignIn) {
			handleCloseSignIn();
			handleShowSignUp();
		} else {
			handleCloseSignUp();
			handleShowSignIn();
		}
	};
	return (
		<div className="landing">
			<SignIn
				handleSwitch={handleSwitch}
				show={showSignIn}
				handleClose={handleCloseSignIn}
			/>
			<SignUp
				handleSwitch={handleSwitch}
				show={showSignUp}
				handleClose={handleCloseSignUp}
			/>
			<LandingNav
				handleSignIn={handleShowSignIn}
				handleSignUp={handleShowSignUp}
			/>
			<div className="landing-vid-tcon">
				<div className="landing-vid-text">
					<br />
					<h2>Hello There! Looking for a Peaceful Stay afloat Waves?</h2>
					<br />
					<h4>Join Us and Discover More!</h4>
					<br />
					<button className="landing-div-button" onClick={handleShowSignUp}>
						GET STARTED
					</button>
					<br />
					<br />
				</div>
			</div>
			<br />
			<br />
		</div>
	);
}

export default Landing;
