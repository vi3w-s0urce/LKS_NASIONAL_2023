import '../App.css';
import { Icon } from '@iconify/react';

const Loading = (props) => {
    const { isLoading, status, message } = props;
    let dom = <div className='loading-child flex flex-col justify-center items-center gap-5'>
    <div className='flex gap-5 loading-circle'>
            <div className='w-[10px] h-[10px] bg-white'></div>
            <div className='w-[10px] h-[10px] bg-white'></div>
            <div className='w-[10px] h-[10px] bg-white'></div>
        </div>
    <p className=' text-lg font-bold text-white'>Loading ...</p>
</div>;
    if (status === 200) {
        dom = <div className='loading-child flex flex-col justify-center items-center gap-3 text-green-500'>
        <Icon icon="line-md:circle-twotone-to-confirm-circle-twotone-transition" width="50" height="50" />
        <p className=' text-lg font-bold whitespace-nowrap'>{message}</p>
        </div>;
    } else {
        dom = <div className='loading-child flex flex-col justify-center items-center gap-3'>
        <Icon icon="line-md:alert-circle-twotone" color="#ef4444" width="50" height="50" />
        <p className=' text-lg font-bold text-red-500 whitespace-nowrap'>{message}</p>
        </div>;
    }
    if (isLoading) {
    dom = <div className='loading-child flex flex-col justify-center items-center gap-5'>
    <div className='flex gap-5 loading-circle'>
            <div className='w-[10px] h-[10px] bg-white'></div>
            <div className='w-[10px] h-[10px] bg-white'></div>
            <div className='w-[10px] h-[10px] bg-white'></div>
        </div>
    <p className=' text-lg font-bold text-white'>Loading ...</p>
    </div>;
    }
    return (
        <div className={`absolute left-0 top-0 h-screen w-screen justify-center items-center overflow-hidden z-10 ${isLoading ? 'loading-anim-parent-in' : 'loading-anim-parent-out'}`}>
            <div className={`flex flex-col items-center justify-center absolute rounded-[100%] bg-sky-300 overflow-hidden ${isLoading ? 'loading-anim-in' : 'loading-anim-out'}`}>
                {dom}
            </div>
        </div>
    );
}

export default Loading;