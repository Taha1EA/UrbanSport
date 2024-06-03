import React,{useState} from 'react';
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const PaymentForm = ({sport,price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [password,handlePassword]=useState("klj")
    const [p,setP]=useState(price)    
    const [cookies] = useCookies(['userI']);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log(paymentMethod)
        if (!error) {
            let classes = new FormData();
            classes.append("id",  paymentMethod.id );
            classes.append("price",  price );
            try {
                const response = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/paymentIntent.php', classes);
                
                const { client_secret } = response.data;

            const confirmCardPayment = await stripe.confirmCardPayment(client_secret);

            if (confirmCardPayment.error) {
                console.error(confirmCardPayment.error.message);
            } else {
                const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/renewPs";
                const fetchData = async () => {
                    let classes = new FormData();
                    classes.append("idClient", parseInt(cookies.userI));
                    classes.append("idPro", parseInt(sport));
                    try {
                        const response = await axios.post(url, classes);
                        if (response.data) {
                            alert(response.data);
                        } else {
                            console.error("Expected an array but got:", response.data);
                        }
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                fetchData();
            }
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        } else {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="mb-4">
                <input type='text'  value={p} onChange={(e)=>handlePassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div className="mb-4">
                <input type='password' placeholder='enter your password' value={password} onChange={(e)=>handlePassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div className="mb-4">
                <CardElement className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <button type="submit" disabled={!stripe} className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
                Pay
            </button>
        </form>
    );

};

export default PaymentForm;
