import React, { useEffect, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import { axiosAuth } from "../api/axiosConfig";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    
    const navigate = useNavigate();
    const { token } = useAuth();

    const [DataState, setState] = useState({
        status: '',
        message: '',
        data: '',
        isLoading: true,
    });

    useEffect(()=>{
        if (!token) {
            navigate('/login')
        } else {
            axiosAuth(token).get('v1/forms')
            .then(response => {
                setState({status: response.data.status, data: response.data.data, isLoading: false});
            })
            .catch(error => {
                setState({status: error.response.data.status, isLoading: false});
            });
        }
    }, [navigate, token])

    const { data, isLoading } = DataState;

    if (!isLoading) {
        return (
            <>
                <div>
                    <Sidebar />
                    <section className="ml-32 py-8 px-10">
                        <h1 className="font-bold text-2xl mb-8">All Created Form</h1>
                        <div className="grid grid-cols-4 gap-5"> 
                            {data.map((item, index)=> (
                                <Card name={item.name} slug={item.slug} desc={item.description}/>
                            ))}
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default Home;