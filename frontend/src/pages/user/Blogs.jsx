import axios from 'axios';
import BlogCard from '../../components/BlogCard'
import CustomNavbar from '../../components/CustomNavbar'
import { useEffect, useRef, useState } from 'react';
import { url } from '../../util/util';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Loading from '../Loading';
function Blogs() {
	const [isLoading,setLoading]=useState(true);
	const token=useSelector((state)=>state.login.token)
	const fadeRefs = useRef([]);
	const [posts,setPosts]=useState([]);

	useEffect(()=>{
		axios.get(`${url}/api/user/blogs/${token}`,{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res)=>{
			console.log(res.data);
			setPosts(res.data);
		})
		.catch(e=>console.log(e))

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

	if(isLoading){
		return(
			<Loading/>
		)
	}

	return (
		<div>
			<CustomNavbar idx="3" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item d-flex flex-column">
					<h2 style={{ fontFamily: "Parisienne" }} >Recent Posts</h2>
					<hr />
					{posts.length > 0 ? (

						posts.map((i) => {
							return (
								<div className ="w-100 m-0 d-flex flex-column" key={i.id} data-aos="fade-up">
									<BlogCard post={i}/>
								</div>
							)
						})
					) : (
						<>
							<h4 className='m-5'>No Blogs Posted Yet!</h4>
							<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
						</>
					)}
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
	)
}

export default Blogs