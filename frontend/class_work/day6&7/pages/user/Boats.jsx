import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CustomNavbar from '../../components/CustomNavbar';
import { Button, Col, Row } from 'react-bootstrap';
import BoatCard from '../../components/BoatCard';
import axios from 'axios';
import { url } from '../../util/util';
import { useSelector } from 'react-redux';
import CustomDatePickerVals from '../../components/CustomDatePickerVals';
import Footer from '../../components/Footer';
import Loading from '../Loading';
  
function Boats() {
    const [isLoading,setLoading]=useState(true);
    const token=useSelector((state)=>state.login.token)
    const fadeRefs = useRef([]);
    const loc=useLocation();
    const [date,setDate]=useState(loc.state.selectedDate);
    const [boats,setBoats]=useState([]);

    const fetchBoats=async(date)=>{
      await axios.post(`${url}/api/user/boats`,{
        "startDate": new Date(date[0].$d),
        "endDate": new Date(date[1].$d)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        setBoats(res.data);
      })
      .catch(e=>console.log(e))

    }
    
    useEffect(()=>{
      fetchBoats(date)
      setTimeout(()=>{
        setLoading(false);
      },1000)
},[])

  const handleDateChange=()=>{
    setBoats([]);
    setTimeout(()=>{
      fetchBoats(date)
    },1000)
  }

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
    <>
    <CustomNavbar idx="1"/>
    <div className="page-container justify-content-center align-items-center d-flex flex-column">
        <br/>
        <br/>
          <CustomDatePickerVals d1={new Date(date[0].$d).toDateString()} d2={new Date(date[1].$d).toDateString()} onDateChange={setDate}/>
          <Button variant='outline-light' className='m-3' onClick={()=>handleDateChange()}>Get Boats!</Button>
        <br/>
        <div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
					<h2 style={{ fontFamily: "Parisienne" }} >Available Boats</h2>
					<hr />

          <Row className='mt-3'>
          {boats.length>0?(
							boats.map((i)=>{
								return(
									<Col key={i.id} md="4"data-aos="fade-up">
									<BoatCard boat={i} date={date}/>
								</Col>
							);
						})
						):(
							<>
							<h4 className='m-5'>No Boats Added Yet!</h4>
							<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
							</>
						)}
          </Row>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
    <Footer/>
    </>

  )
}

export default Boats