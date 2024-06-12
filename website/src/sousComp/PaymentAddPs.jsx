import React,{useState} from 'react';
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Notification from '../Composent/ClientsCom/Notification';
const PaymentForm = ({sport,price,weekDays,nbdays}) => {
    const [notification, setNotification] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [password,handlePassword]=useState("klj")
    const [p,setP]=useState(price)    
    const [cookies] = useCookies(['userI']);
    console.log([sport,price,weekDays,nbdays]);
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
                const response = await axios.post('http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/paymentIntent.php', classes);
                
                const { client_secret } = response.data;

            const confirmCardPayment = await stripe.confirmCardPayment(client_secret);

            if (confirmCardPayment.error) {
                console.error(confirmCardPayment.error.message);
            } else {
                const url = "http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/cSide/inscrire";
                const fetchData = async () => {
                    let classes = new FormData();
                    classes.append("idClient", (cookies.userI));
                    classes.append("idPro", parseInt(sport));
                    classes.append("idWeek", parseInt(weekDays));
                    classes.append("nbdays", nbdays);
                    try {
                        const response = await axios.post(url, classes);
                        if (response.data) {
                            setNotification('You Inscrire on the Programme  successfully');
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
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
                <h1>You have to pay : {p} DHS</h1>
            </div>
            <div className="mb-4">
                <CardElement className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <button type="submit" disabled={!stripe} className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
                Pay
            </button>
            <Notification message={notification} />
        </form>
    );

};

export default PaymentForm;
