import { Col, Row } from 'react-bootstrap'
import AdminNavbar from '../../components/AdminNavbar'
import AdminBookingCard from '../../components/AdminBookingCard'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { url } from '../../util/util';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Loading from '../Loading';

function AdminBookings() {
  const token = useSelector((state) => state.login.token);
  const fadeRefs = useRef([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading,setLoading]=useState(true);

  
  useEffect(() => {
    axios.get(`${url}/api/admin/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setBookings(res.data);
    })
      .catch((e) => {
        console.log(e)
      })
      setTimeout(()=>{
        setLoading(false)
      },1000)
  }, [])

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
      <AdminNavbar idx="3" />
      <div className="page-container justify-content-center align-items-center d-flex flex-column">
        <br />
        <br />
        <div ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
          <h2 style={{ fontFamily: "Parisienne" }} >All Bookings</h2>
          <hr />
          <Row className='mt-3'>
            {bookings.length > 0 ? (
              bookings.map((i) => {
                return (
                  <Col md="4" key={i.id} data-aos="fade-up">
                    <AdminBookingCard booking={i} />
                  </Col>
                )
              })
              ) : (
                <>
                <h4 className='m-5'>No Bookings Done Yet!</h4>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </>
            )}
          </Row>
        </div>
        <br />
        <br />
      </div>
      <Footer/>
    </div>
  )
}

export default AdminBookings