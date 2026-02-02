import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWarnningMessage } from "../data/ChatSlice";

export default function ProtectedAuthRoute({ children }) {
    const isAuthenticated = useSelector((s) => s.chat.isAuthenticated);
    const dispatch = useDispatch();
    const location = useLocation();

    if (isAuthenticated) {
        dispatch(setWarnningMessage("You are already logged in"));
        return <Navigate to="/chat/chats" state={{ from: location }} replace />;
    }

    return children;
}