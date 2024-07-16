import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        agreed: false 
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setValues(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:8081/api/login', {
                email: values.email,
                password: values.password
            });

           console.log('Login successful!', response.data);
        } catch (error) {
           console.error('Login failed:', error.response.data);
        }
    };


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email : </strong></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            autoComplete='off'
                            className="form-control rounded-0"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password : </strong></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="form-control rounded-0"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input
                            type="checkbox"
                            name="agreed"
                            id='tick'
                            className='me-2'
                            checked={values.agreed}
                            onChange={handleChange}
                        />
                        <label htmlFor="checkbox">You Agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
