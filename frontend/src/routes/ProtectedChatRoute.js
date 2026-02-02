import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWarnningMessage } from "../data/ChatSlice";

export default function ProtectedChatRoute({ children }) {
    const isAuthenticated = useSelector((s) => s.chat.isAuthenticated);
    const dispatch = useDispatch();
    const location = useLocation();

    if (!isAuthenticated) {
        dispatch(setWarnningMessage("Please login first"));
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
