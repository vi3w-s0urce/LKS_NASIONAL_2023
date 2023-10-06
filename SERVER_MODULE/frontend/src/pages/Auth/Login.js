import { Component } from 'react';
import axios from 'axios';
import LoginBanner from '../../assets/img/login.svg';
import LoadingAnimation from '../../assets/img/pablita-loading.gif';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            status: '',
            message: '',
            data: '',
            error_message: '',
            isLoading: false,
        };
    };

    handleSubmit = (e) => {
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

        this.setState({isLoading : true});
        
        axiosInstance.post('v1/auth/login', {
            'email': email,
            'password': password,
        })
        .then(response => {
            token = response.data.data.user.token;

            this.setState({token: token})
            this.setState({isLoading : false});
        })
        .catch(error => {
            status = error.response.data.status;
            message = error.response.data.message;
            error_message = <p className=' text-red-400 mb-4 font-bold'>! {message}</p>;

            this.setState({status: status, message: message, error_message});
            this.setState({isLoading : false});
        });
    }
    
    render () {
        if (this.state.isLoading) {
            return (
                <section className='h-screen w-screen flex flex-col items-center justify-center gap-5'>
                    <img src={LoadingAnimation} alt='loading animation' className='w-[50px]'/>
                    <p className=' text-lg font-bold'>Loading...</p>
                </section>
            );
        }
        return (
            <section className='flex h-screen items-center justify-center gap-40'>
                <img src={LoginBanner} alt='LoginBanner' className='w-[500px]'></img>
                <div>
                    <div className='mb-3'>
                        <h1 className='font-bold text-4xl mb-2'>Login User</h1>
                        <p className='text-slate-400'>Silahkan login terlebih dahulu untuk mengakses aplikasi</p>
                    </div>
                    <form method='POST' onSubmit={this.handleSubmit}>
                        <div className='flex flex-col mb-4 gap-2'>
                            <label>Email</label>
                            <input type='email' placeholder='Masukkan Email' name='email' className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none' required/>
                        </div>
                        <div className='flex flex-col mb-4 gap-2'>
                            <label>Password</label>
                            <input type='password' placeholder='Masukkan Password' name='password' className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none' required/>
                        </div>
                        {this.state.error_message}
                        <button type='submit' className=' bg-sky-400 text-white p-2 rounded-lg font-bold w-full disabled:bg-slate-300'>Login</button>
                    </form>
                </div>
            </section>
        );
    }
};

export default Login;