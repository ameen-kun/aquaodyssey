import { Button, Form, Modal } from "react-bootstrap"
import AdminBlogCard from "../../components/AdminBlogCard"
import AdminNavbar from "../../components/AdminNavbar"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../../util/util";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Loading from "../Loading";

function AdminBlogs() {
	const token=useSelector((state)=>state.login.token)
	const [isLoading,setLoading]=useState(true);
	const [showModal, setShowModal] = useState(false);
	const [newPost, setNewPost] = useState({});
	const [posts,setPosts]=useState([]);

	useEffect(()=>{
		axios.get(`${url}/api/admin/blogs`,{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res)=>{
			setPosts(res.data);
		})
		.catch(e=>console.log(e))

		setTimeout(()=>{
			setLoading(false)
		},1000)
	},[])
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	};
	
	const handleCreate = () => {
		setShowModal(true);
	};
	
	
	const handleSave = () => {
		try{
			const newPostDTO={...newPost}
			newPostDTO.token=token
			axios.post(`${url}/api/admin/blog`,newPostDTO,{
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
	}, [isLoading]);

	if(isLoading){
			return(
				<Loading/>
			)
		}

	return (
		
		<div>
			<AdminNavbar idx="5" />

			<EditModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				post={newPost}
				handleChange={handleChange}
				handleSave={handleSave}
			/>
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Create a Post</h2>
					<Button variant="outline-light" className='m-3' onClick={handleCreate} data-aos="fade-up" >Create Post!</Button>
					<hr />
				</div>
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item d-flex flex-column">
					<h2 style={{ fontFamily: "Parisienne" }} >All Blogs</h2>
					<hr />
					{posts.length>0?(

						posts.map((i) => {
							return (
								<div key={i.id} data-aos="fade-up" className="w-100 d-flex flex-column">
									<AdminBlogCard post={i} />
								</div>
								)
							})
					):(
						<>
							<h4 className='m-5'>No Blogs Posted Yet!</h4>
							<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
							</>
					)}
				</div>
			</div>
			<Footer/>
		</div>
	)
}

function EditModal({ show, handleClose, post, handleChange, handleSave }) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSave}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Blog</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formBasicContent" className='mt-2'>
						<Form.Label>Caption</Form.Label>
						<Form.Control
							as="textarea"
							rows={5}
							name="caption"
							value={post.caption}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicType" className='mt-2'>
						<Form.Label>Type</Form.Label>
						<Form.Control
							as="select"
							name="type"
							value={post.type}
							onChange={handleChange}
							required
						>
							<option value="">Select</option>
							<option value="video">Video</option>
							<option value="image">Image</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="formBasicSrc" className='mt-2'>
						<Form.Label>Source (URL)</Form.Label>
						<Form.Control
							type="text"
							name="src"
							value={post.src}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer className='mt-2'>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="outline-dark" type="submit">
						Add Post!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default AdminBlogs