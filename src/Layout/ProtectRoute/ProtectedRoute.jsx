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
                const response = await ServerApi.post("auth/verify/admin", {}, { headers });
                const data = response.data;
                if (!auth_info.admin) setLocalData("auth_info", { ...auth_info, admin: data });

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