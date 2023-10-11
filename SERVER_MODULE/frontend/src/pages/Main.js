import { useNavigate } from "react-router";
import Sidebar from "../components/layouts/Sidebar";
import Create from "./form/Create";
import Home from "./Home";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import DetailForm from "./form/DetailForm";

const Main = (props) => {
    const { uri } = props;
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    });
    return (
        <>
            <Sidebar uri={uri} />
            { uri === "Home" ? <Home token={token} /> : uri === "Create" ? <Create token={token}/> : uri === "DetailForm" ? <DetailForm token={token} /> : null }
        </>
    );
}

export default Main;