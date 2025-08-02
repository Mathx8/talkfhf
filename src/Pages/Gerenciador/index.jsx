import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TelaAdmin from "../../Components/TelaAdmin";

const Gerenciador = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const papel = localStorage.getItem("papel");
        const timestamp = localStorage.getItem("loginTimestamp");

        const isAuthorized = papel === "admin" || papel === "editor";
        const isExpired = !timestamp || (Date.now() - parseInt(timestamp, 10)) > 12 * 60 * 60 * 1000;

        if (!isAuthorized || isExpired) {
            localStorage.removeItem("papel");
            localStorage.removeItem("loginTimestamp");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <TelaAdmin />
        </div>
    );
};

export default Gerenciador;
