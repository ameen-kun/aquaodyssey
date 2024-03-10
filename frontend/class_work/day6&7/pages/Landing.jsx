import "../assets/styles/landing.css"
import { useEffect, useRef, useState } from "react";
import LandingNav from "../components/LandingNav"
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn"
import Footer from "../components/Footer";

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
		<div className="landing">
			<SignIn
				handleSwitch={handleSwitch}
				show={showSignIn}
				handleClose={handleCloseSignIn}
			/>
			<SignUp
				enableSwitch={true}
				handleSwitch={handleSwitch}
				show={showSignUp}
				handleClose={handleCloseSignUp}
				role="USER"
			/>
			<LandingNav
				handleSignIn={handleShowSignIn}
				handleSignUp={handleShowSignUp}
			/>
			<div ref={(el) => fadeRefs.current.push(el)} className="landing-vid-tcon fade-item">
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
			<Footer/>
		</div>
	);
}

export default Landing;
