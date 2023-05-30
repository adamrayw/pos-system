import { Navigate } from "react-router-dom";
import { useApiCheckSubscriptions } from "../../services/api.service";
import { useEffect, useState } from "react";

function Protected({ children }) {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem('user'))?.id ?? '';
    const [isSubscribed, setIsSubscribed] = useState();

    useEffect(() => {
        const checkSubs = async () => {
            try {
                const checkSubscriptions = await useApiCheckSubscriptions("user/checkSubscription/" + userId)
                setIsSubscribed(checkSubscriptions.response.data.isHaveActiveSubscription);
            } catch (error) {
                alert(error);
            }
        };
        checkSubs();
    }, [userId]);

    if (isSubscribed === false) {
        return <Navigate to="/dashboard?isSubscribed=false" replace={true} />;
    }

    if (!token) {
        return <Navigate to="/" replace={true} />;
    }
    return children;
}

export default Protected;