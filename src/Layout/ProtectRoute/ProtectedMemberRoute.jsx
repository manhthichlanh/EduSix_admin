import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { getLocalData } from "../../utils/helper";
const ProtectedMemberRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const { admin } = getLocalData("auth_info")
        if (admin.role != 4) navigate("/admin/login");
    }, [])

    return children

};

export default ProtectedMemberRoute;