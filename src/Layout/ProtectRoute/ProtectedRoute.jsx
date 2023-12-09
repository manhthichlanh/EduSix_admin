import { useNavigate } from "react-router-dom"
import { ServerApi } from "../../utils/http";
import { useEffect, useState } from "react";
import { getLocalData, setLocalData } from "../../utils/helper";
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null)
    const fetchingAuth = async () => {
        try {
            const { token } = getLocalData("auth_info")
            if (!token) return null
            const headers = {
                'Authorization': 'Bearer ' + token
            }
            const response = await ServerApi.post("auth/verify/admin", {}, { headers });
            const data = response.data;
            setProfile(data)
            return data
        } catch (error) {
            console.log(error)
            return null
        }

    }

    useEffect(() => {
        if (!profile)
            fetchingAuth()
                .then((data) => {
                    if (!data) {
                        navigate("/admin/login");
                    }
                })
    }, [profile, navigate])

    return children

};

export default ProtectedRoute;