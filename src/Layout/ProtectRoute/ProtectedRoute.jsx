import { useNavigate } from "react-router-dom"
import { ServerApi } from "../../utils/http";
import { useEffect, useState } from "react";
import { getLocalData } from "../../utils/helper";
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const token = getLocalData("auth_info").token;
                const headers = {
                    'Authorization': 'Bearer ' + token
                }
                const response = await ServerApi.post("auth/protected", {}, { headers });
                const data = response.data;
            } catch (error) {
                console.log(error)
                navigate("/admin/login");
            }
        }
        )()
    }, [])

    return children

};

export default ProtectedRoute;