import landingVideo from "../assets/videos/4783980_Great Britain_London_UK_1920x1080.mp4";

function BackgroundVideo() {
	return (
		<video className="bg-vid" autoPlay loop muted>
			<source src={landingVideo} type="video/mp4" />
		</video>
	);
}

export default BackgroundVideo;
