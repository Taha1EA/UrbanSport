import React, { useState } from 'react';
import axios from 'axios';

const Verifycode = () => {
    const [email, setEmail] = useState('');
    const [verify, setVerify] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/VerifyEmail.php', {
                email,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
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
            const res = await axios.post('http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/VerifyEmail.php', {
                verification: parseInt(verify, 10),
                email: email // Send email along with verification code for PHP script
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setResponse(res.data);
            if (res.data.status === 'success') {
                setTimeout(() => {
                    // Redirect to dashboard
                    window.location.href = '/complete-registration';
                }, 2000);
            }
        } catch (error) {
            setResponse({ status: 'error', message: 'An error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={sendVerificationCode}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" name="send" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>

            <form onSubmit={verifyCode}>
                <div>
                    <label htmlFor="verification">Verification Code:</label>
                    <input
                        type="text"
                        id="verification"
                        name="verification"
                        value={verify}
                        onChange={(e) => setVerify(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" name="verify" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>

            {response && <p>{response.message}</p>}
        </div>
    );
};

export default Verifycode;
