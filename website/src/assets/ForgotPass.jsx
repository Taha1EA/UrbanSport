import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [verify, setVerify] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/MAIL.php', {
                email,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            setResponse(res.data);
        } catch (error) {
            setResponse({ status: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/MAIL.php', {
                verification: parseInt(verify, 10),
                email: email // Send email along with verification code for PHP script
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            setResponse(res.data);
            if (res.data.status === 'success') {
                setTimeout(() => {
                    // Redirect to dashboard
                    window.location.href = '/ChangePass';
                }, 2000);
            }
        } catch (error) {
            setResponse({ status: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='text-black h-[100vh] flex flex-col justify-center items-center bg-white'>
             <Navbar/>
            <form onSubmit={sendVerificationCode} className='bg-white border-4 w-[400px] h-[150px] mb-3 border-[#444444] rounded-md p-8 shadow-lg relative'>
                <div>
                   
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='block w-72 h-[20px] pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
                    />
                     <label htmlFor="email" className='absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-8 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email:</label>
                </div>
                <button type="submit" name="send" disabled={loading} className='cursor-pointer	 w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300'>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>

            <form onSubmit={verifyCode} className='bg-white border-4  w-[400px] h-[150px] border-[#444444] rounded-md p-8 shadow-lg relative'>
                <div>
                    <input
                        type="text"
                        id="verification"
                        name="verification"
                        value={verify}
                        onChange={(e) => setVerify(e.target.value)}
                        required
                        className='block w-72 pl-2 px-0 text-sm text-black bg-white border-0 border-b-2 border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-black focus:border-white peer'
                    />
                    <label htmlFor="verification" className=' absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-8 z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Verification Code:</label>
                </div>
                <button type="submit" name="verify" disabled={loading} className='cursor-pointer	 w-full mb-4 text-[15px] mt-6 rounded-full bg-gray-800 text-yellow-50 hover:bg-yellow-50 hover:text-gray-800 py-2 transition-colors duration-300'>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>

            {response && <p>{response.message}</p>}
        </div>
    );
};

export default ForgotPass;
