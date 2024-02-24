import AdminNavbar from '../../components/AdminNavbar'
import { Container } from 'react-bootstrap'
import AdminTransactionCard from '../../components/AdminTransactionCard'
import { useEffect, useRef } from 'react';

function AdminTransactions() {
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
			<AdminNavbar idx="4" />
			<div className="page-container justify-content-center align-items-center d-flex flex-column">
				<br />
				<br />
				<div  ref={(el) => fadeRefs.current.push(el)} className="text-white rounded p-3 w-75 fade-item">
        <h2 style={{ fontFamily: "Parisienne" }} >All Transactions</h2>
					<hr />
					<Container className='d-flex flex-column align-items-center' >
					<AdminTransactionCard/>
					<AdminTransactionCard/>
					</Container>
        </div>
        </div>
        </div>
  )
}

export default AdminTransactions