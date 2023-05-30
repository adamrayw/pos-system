import { Navigate } from "react-router-dom";

const MissingRoute = ({ children }) => {

    return <Navigate to="/404" replace={true} />;

}

export default MissingRoute;