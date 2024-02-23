import { Container} from 'react-bootstrap'
import BlogCard from '../../components/BlogCard'
import CustomNavbar from '../../components/CustomNavbar'
import { useEffect, useRef } from 'react';
function Blogs() {
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
      <CustomNavbar idx="3" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)}  className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Recent Posts</h2>
					<hr />
					<Container className='d-flex align-items-center flex-column'>
					<BlogCard post={{type:"video"}}/>
					<BlogCard />
					<BlogCard />
					<BlogCard post={{type:"video"}}/>
					</Container>
					<br/>
					</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
    </div>
  )
}

export default Blogs