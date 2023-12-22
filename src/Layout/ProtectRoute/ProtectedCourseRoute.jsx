import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { getLocalData } from "../../utils/helper";
const ProtectedCourseRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const { admin } = getLocalData("auth_info")
        if (admin.role != 1 && admin.role != 0) navigate("/admin/login");
    }, [])

    return children

};

export default ProtectedCourseRoute;