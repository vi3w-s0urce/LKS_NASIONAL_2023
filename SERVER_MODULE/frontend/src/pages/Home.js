import React, { useEffect, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import { axiosAuth } from "../api/axiosConfig";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const Home = (props) => {
    const { token } = props;

    const [DataState, setState] = useState({
        status: '',
        message: '',
        data: '',
        isLoading: true,
    });

    useEffect(() => {
        axiosAuth(token).get('v1/forms')
        .then(response => {
            setState({ status: response.data.status, data: response.data.data, isLoading: false, message: response.data.status });
        })
        .catch(error => {
            setState({ status: error.response.data.status, isLoading: false, message: error.response.data.status });
        });
    }, []);

    const { data, isLoading } = DataState;

    return (
        <>
            <section className="ml-52 py-8 px-10">
                <h1 className="font-bold text-2xl mb-8">All Created Form</h1>
                <div className="grid grid-cols-4 gap-5">
                    {!isLoading ?
                        (data.map((item) => (
                            <>
                                <Card key={item.id} id={item.id} name={item.name} slug={item.slug} desc={item.description} />
                            </>
                        ))) : <Card />
                    }
                </div>
            </section>
        </>
    );
}

export default Home;