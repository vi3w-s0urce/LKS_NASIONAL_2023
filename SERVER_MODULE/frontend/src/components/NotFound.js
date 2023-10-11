import NotFoundImg from '../assets/img/404.svg';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const NotFound = () => {
    return (
        <section className='h-screen flex flex-col justify-center items-center'>
            <img src={NotFoundImg} alt='404' className='w-[450px]' />
            <Link to='/' className='flex items-center text-xl gap-2 justify-center border-2 border-sky-200 py-2 px-4 rounded-xl text-sky-400 font-bold hover:bg-sky-400 hover:text-white transition-all duration-300'><Icon icon="line-md:arrow-small-left" width="20" />Back to home</Link>
        </section>
    );
};

export default NotFound;