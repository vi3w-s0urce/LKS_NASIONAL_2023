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
    const { token, user } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, []); 

    if (token) {
        return (
            <>
                <Sidebar uri={uri} />
                { uri === "Home" ? <Home token={token} user={user} /> : uri === "Create" ? <Create token={token} user={user}/> : uri === "DetailForm" ? <DetailForm token={token} user={user} /> : null }
            </>
        );
    }
}

export default Main;