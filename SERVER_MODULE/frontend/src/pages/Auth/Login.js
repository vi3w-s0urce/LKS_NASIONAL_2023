import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Loading from '../../components/Loading';
import LoginBanner from '../../assets/img/login.svg';

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        status: '',
        message: '',
        data: '',
        error_message: '',
        isLoading: false,
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        let status;
        let message;
        let error_message;
        let token;

        const axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
        });
            
        setState({ isLoading: true });

        axiosInstance.post('v1/auth/login', {
            'email': email,
            'password': password,
        })
            .then(response => {
                token = response.data.data.user.token;
                setState({ token: token, isLoading: false });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(error => {
                status = error.response.data.status;
                message = error.response.data.message;
                error_message = <div className='bg-red-100 p-2 rounded-lg text-center border-2 border-red-400'>
                                    <p className=' text-red-400 font-bold'>! {message}</p>
                                </div>;
                setState({ status: status, message: message, error_message: error_message, isLoading: false });
            });
    }

    return (
        <>
        <Loading isLoading={state.isLoading} status={state.status} />
        <section className='flex h-screen items-center justify-center gap-40'>
            <div>
                <h1 className='text-xl text-sky-500 font-bold mb-5'>Formify.</h1>
                <div className='mb-5'>
                    <h1 className='font-bold text-4xl mb-2'>Welcome!</h1>
                    <p className='text-slate-400'>Silahkan login terlebih dahulu untuk masuk ke Formify.</p>
                </div>
                <form method='POST' onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-4 gap-2'>
                        <label>Email</label>
                        <input type='email' placeholder='Masukkan Email' name='email' className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none' required />
                    </div>
                    <div className='flex flex-col mb-4 gap-2'>
                        <label>Password</label>
                        <input type='password' placeholder='Masukkan Password' name='password' className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none' required />
                    </div>
                    {state.error_message}
                    <button type='submit' className=' bg-sky-400 text-white p-2 rounded-lg font-bold w-full mt-5 disabled:bg-slate-300'>Login</button>
                </form>
            </div>
            <img src={LoginBanner} alt='LoginBanner' className='w-[500px]'></img>
        </section>
        </>
    );
}

export default Login;