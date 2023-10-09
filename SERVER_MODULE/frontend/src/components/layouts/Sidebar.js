import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { axiosAuth } from "../../api/axiosConfig";
import Loading from "../Loading";
import { useState } from "react";


const Sidebar = () => {

    const { token, logout } = useAuth();

    const [state, setState] = useState({
        status: '',
        isLoading: ''
    });

    const handleLogout = () => {
        setState({isLoading: true})
        setTimeout(()=>{
            axiosAuth(token).post('v1/auth/logout')
            .then(response => {
                setState({status: response.data.status});
                setTimeout(()=> {
                    setState({isLoading: false});
                    logout();
                }, 2000)
            })
            .catch(error => {
                // isLoading = false;
                // status = error.response.data.status;
                console.log(error);
            })
        }, 1000);
    }

    return (
        <>
        <Loading isLoading={state.isLoading} status={state.status} />
        <div className="h-screen w-32 flex flex-col justify-between items-center p-8 fixed bg-white border-r-2 border-slate-200">
            <h1 className="text-sky-500 font-bold text-xl">Formify.</h1>
            <ul className="flex flex-col justify-center items-center gap-10">
                <li className="flex flex-col items-center text-slate-600 font-bold">
                    <a href="/"><Icon icon="line-md:home-md" width="45" className="mb-1" />Home</a>
                </li>
                <li className="flex flex-col items-center text-slate-600 font-bold">
                    <a href="/"><Icon icon="line-md:clipboard-arrow" width="45" className="mb-1" />Create</a>
                </li>
            </ul>
            <div className="text-center">
                <div className="font-bold text-xl mb-5 flex flex-col items-center"><Icon icon="line-md:account" width="45" className="mb-1" />User 3</div>
                <div className="flex flex-col items-center text-red-500 font-bold">
                <button onClick={handleLogout}>
                    <Icon icon="line-md:arrow-close-left" width="45" className="mb-1" />Logout
                </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Sidebar;

