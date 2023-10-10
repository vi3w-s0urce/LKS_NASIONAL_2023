import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { axiosAuth } from "../../api/axiosConfig";
import Loading from "../Loading";
import { useState } from "react";
import { Link } from "react-router-dom";


const Sidebar = (props) => {

    const { token, logout } = useAuth();

    const [state, setState] = useState({
        status: '',
        message: '',
        isLoading: ''
    });

    const handleLogout = () => {
        setState({isLoading: true})
        setTimeout(()=>{
            axiosAuth(token).post('v1/auth/logout')
            .then(response => {
                setState({status: response.data.status, message: response.data.message });
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

    const { uri } = props;

    return (
        <>
        <Loading isLoading={state.isLoading} status={state.status} message={state.message} />
        <div className="h-screen w-52 flex flex-col justify-between px-5 py-8 fixed bg-white border-r-2 border-sky-200">
            <div>
                <h1 className="text-sky-400 font-bold text-xl pb-5 border-b-2 border-slate-200">Formify.</h1>
                <ul className="flex flex-col items-center gap-2 mt-5">
                    <li className={`transition-all duration-300 font-bold py-2 px-3 w-full rounded-xl ${ uri === "Home" ? "bg-sky-400 text-white" : "text-slate-600 hover:bg-slate-200" } `}>
                        <Link to="/" className="flex items-center gap-3"><Icon icon="line-md:home-md" width="28" />Home</Link>
                    </li>
                    <li className={`transition-all duration-300 font-bold py-2 px-3 w-full rounded-xl ${ uri === "Create" ? "bg-sky-400 text-white" : "text-slate-600 hover:bg-slate-200" } `}>
                        <Link to="/create" className="flex items-center gap-3"><Icon icon="line-md:clipboard-arrow" width="28" />Create</Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center py-3 px-3 gap-2 w-full font-bold rounded-xl border-2 border-sky-200 text-sky-500">
                    <Icon icon="line-md:account" width="28" />User 3
                </div>
                <button onClick={handleLogout} className="flex items-center py-2 px-3 border-2 border-red-200 gap-2 w-full rounded-xl hover:bg-red-500 text-red-500 hover:text-white font-bold transition-all duration-300">
                    <Icon icon="line-md:arrow-close-left" width="28" />Logout
                </button>
            </div>
        </div>
        </>
    );
}

export default Sidebar;

