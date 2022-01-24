import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../assets/logo.jpg'
import axios from 'axios';
import Loading from './loading';
import ErrorMessage from './ErrorMessage';



function Login({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassord] = useState("")
    const [error, setError] = useState(false)
    const [lodaing, setLoading] = useState(false);
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            history.push("/Calendar");
        }

    }, [history])
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "content-type": "application/json"
                }
            }


            setLoading(true)
            const { data } = await axios.post('https://yassine-backend.herokuapp.com/api/users/login', {
                email, password
            }, config);
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));

            setLoading(false)
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false)


        }
        window.location.reload();

    }


    return (
        <div className="login">
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {Loading && <Loading />}

            <div className="login__container">
                <img src={logo} alt="Logo " />
                <h1 >Welcome to Zimota </h1>
                {Loading && <Loading />}
                <form className='inputs1' onSubmit={submitHandler}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder=' email' />
                    <input value={password} onChange={(e) => setPassord(e.target.value)} type="password" placeholder='password' />
                    <button onClick={submitHandler}><strong>Sign in</strong> </button>

                </form>

            </div>

        </div>
    );
}

export default Login
