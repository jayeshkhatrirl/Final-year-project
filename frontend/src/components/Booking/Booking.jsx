import React, { useState, useContext ,useEffect} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useRazorpay from "react-razorpay";
import { BASE_URL } from '../../utils/config'
const Booking = ({ tour, avgRating }) => {
   const { price, reviews, title } = tour
   const navigate = useNavigate()
   const [Razorpay] = useRazorpay();

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: ''
   })
         
   
   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const serviceFee = 10
   const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

   const openCheckout = ({id,amount}) => {
      let options = {
         key: "rzp_test_yh1IjEg9DR4MKK", // Enter the Key ID generated from the Dashboard
         amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
         currency: "INR",
         name: "Tours and Travel",
         description: "Test Transaction",
         order_id:id,
        handler: function (response){
          alert(response.razorpay_payment_id);
        },
        prefill: {
         name: "Harshit Jain",
         email: "harshit.jain221202.com",
         contact: "9336087327",
       },
       notes: {
         address: "Razorpay Corporate Office",
       },
       theme: {
         color: "F4A62F",
       },
      };
      
      let rzp = new Razorpay(options);
      rzp.open();
    }

   const handleClick = async e => {

   const amount = 500000;
    const currency = 'INR';
    const receiptId = 'rcpt110011';

      const response = await fetch(`${BASE_URL}/payment/create`,{
         method:'POST',
         headers:{
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            amount,
            currency,
            receipt: receiptId
          })
      });
      
      const order = await response.json();
      console.log('order', order);

      openCheckout(order);
      navigate('/');
      

   }

   return (
      <div className='booking'>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>₹{price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3'>
                  <input type="date" placeholder='' id='bookAt' required
                     onChange={handleChange} />
                  <input type="number" placeholder='Guest' id='guestSize' min={"1"} required
                     onChange={handleChange} />
               </FormGroup>
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>₹{price} <i class='ri-close-line'></i> / person</h5>
                  <span> ₹{price}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>₹{serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  <span>₹{totalAmount}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
         </div>
      </div>
   )
}

export default Booking



