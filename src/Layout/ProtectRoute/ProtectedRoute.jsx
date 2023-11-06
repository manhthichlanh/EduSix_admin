import { useNavigate } from "react-router-dom"
import { ServerApi } from "../../utils/http";
import { useEffect, useState } from "react";
import { getLocalData, setLocalData } from "../../utils/helper";
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const auth_info = getLocalData("auth_info")
                const headers = {
                    'Authorization': 'Bearer ' + auth_info.token
                }
                const response = await ServerApi.post("auth/protected", {}, { headers });
                const data = response.data;
                if (!auth_info.user) setLocalData("auth_info", { ...auth_info, user: data });

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