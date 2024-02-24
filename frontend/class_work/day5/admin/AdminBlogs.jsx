import { Button, Container } from "react-bootstrap"
import AdminBlogCard from "../../components/AdminBlogCard"
import AdminNavbar from "../../components/AdminNavbar"
import { useEffect, useRef } from "react";

function AdminBlogs() {
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
			<AdminNavbar idx="5" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
      <br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Create a Post</h2>
            <Button variant="outline-light" className='m-3'>Create Post!</Button>
					<hr />
        </div>
        <br />
				<br />
				<div  ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
        <h2 style={{ fontFamily: "Parisienne" }} >All Blogs</h2>
					<hr />
					<Container className='d-flex align-items-center flex-column'>
					<AdminBlogCard post={{type:"video"}}/>
					<AdminBlogCard />
					<AdminBlogCard />
					<AdminBlogCard post={{type:"video"}}/>
					</Container>
        </div>
        </div>
        </div>
  )
}

export default AdminBlogs