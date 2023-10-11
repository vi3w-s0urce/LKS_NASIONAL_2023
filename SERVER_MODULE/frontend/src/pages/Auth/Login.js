import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import LoginBanner from '../../assets/img/login.gif';
import { Icon } from '@iconify/react';
import { axiosBase } from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();

    const { login, token } = useAuth();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);


    const [LoginState, setState] = useState({
        email: '',
        password: '',
        status: '',
        message: '',
        error_message: '',
        token: '',
        data_user: '',
        isLoading: false,
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        let status;
        let message;
        let error_message;
        let data_user;
        let token;

        setState({ isLoading: true });

        axiosBase.post('v1/auth/login', {
            'email': email,
            'password': password,
        })
            .then(response => {
                status = response.data.status;
                data_user = JSON.stringify(response.data.data.user);
                token = 'Bearer ' + response.data.data.user.token;

                login(data_user, token);

                setState({ status: status, isLoading: false, token: token, data_user: data_user, message: response.data.message })

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(error => {
                status = error.response.data.status;
                message = error.response.data.message;
                error_message = <div className='flex justify-center items-center gap-2 bg-red-100 p-2 rounded-lg border-2 border-red-400 text-red-400 font-bold'>
                    <Icon icon="line-md:alert-circle" color="#f87171" width="24" /><span>{message}</span>
                </div>;
                setState({ status: status, message: message, error_message: error_message, isLoading: false, });
            });
    }

    return (
        <>
            <Loading isLoading={LoginState.isLoading} status={LoginState.status} message={LoginState.message} />
            <section className='flex h-screen items-center justify-between transition-all duration-300'>
                <div className='w-full h-screen flex items-center justify-center'>
                    <div>
                        <h1 className='text-xl text-sky-400 font-bold mb-5'>Formify.</h1>
                        <div className='mb-5'>
                            <h1 className='font-bold text-4xl mb-2'>Welcome!</h1>
                            <p className='text-slate-400'>Silahkan login terlebih dahulu untuk masuk ke Formify.</p>
                        </div>
                        <form method='POST' onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-4 gap-2'>
                                <label>Email</label>
                                <input type='email' placeholder='Masukkan Email' name='email' className='transition-all duration-300 border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none' required />
                            </div>
                            <div className='flex flex-col mb-4 gap-2'>
                                <label>Password</label>
                                <input type='password' placeholder='Masukkan Password' name='password' className='transition-all duration-300 border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none' required />
                            </div>
                            {LoginState.error_message}
                            <button type='submit' className='transition-all duration-300 bg-sky-400 text-white p-2 rounded-lg font-bold w-full mt-5 disabled:bg-slate-300 hover:bg-sky-500'>Login</button>
                        </form>
                    </div>
                </div>
                <div className='h-screen w-full bg-sky-200 flex items-center justify-center'>
                    <img src={LoginBanner} alt='LoginBanner' className='w-[500px]'></img>
                </div>
            </section>
        </>
    );
}

export default Login;