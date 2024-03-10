import { Card } from 'react-bootstrap'

function AdminTransactionCard({ transaction }) {
  return (
    <Card className='m-4'>
      <Card.Body>
        <Card.Text className='mx-3'>
          <p>
            <strong>
              Transaction  ID: </strong>
              {transaction.id}
          </p>
          <p>
            <strong>
              Booking ID: </strong>{
              transaction.bookingId}
          </p>
          <p>
            <strong>
              By User: </strong>
            {transaction.paidBy}
          </p>
          <p style={{color:transaction.status?"green":"red"}}>
            <strong>
              Status: </strong>
            {transaction.status === true ? "Success" : "Failure"}
              
          </p>
          <p>
            <strong>
              On: </strong>
            {new Date(transaction.transactionDate).toDateString()}
          </p>
          <p>
            <strong>
              Price: </strong>
            ${transaction.price}
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default AdminTransactionCard