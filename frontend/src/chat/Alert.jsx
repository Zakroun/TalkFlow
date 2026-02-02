import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../data/ChatSlice";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from "react-icons/fa";

export default function Alert() {
    const successMessage = useSelector((s) => s.chat.successMessage);
    const errorMessage = useSelector((s) => s.chat.errorMessage);
    const warningMessage = useSelector((s) => s.chat.warnningMessage);
    const infoMessage = useSelector((s) => s.chat.infoMessage);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (successMessage) {
            setMessage(successMessage);
            setType("success");
            setVisible(true);
            setProgress(100);
        } else if (errorMessage) {
            setMessage(errorMessage);
            setType("error");
            setVisible(true);
            setProgress(100);
        } else if (warningMessage) {
            setMessage(warningMessage);
            setType("warning");
            setVisible(true);
            setProgress(100);
        } else if (infoMessage) {
            setMessage(infoMessage);
            setType("info");
            setVisible(true);
            setProgress(100);
        }
    }, [successMessage, errorMessage, warningMessage, infoMessage]);

    useEffect(() => {
        if (!visible) return;

        const timer = setInterval(() => {
            setProgress(prev => Math.max(prev - 1, 0));
        }, 50);

        return () => clearInterval(timer);
    }, [visible]);

    useEffect(() => {
        if (progress === 0 && visible) {
            setVisible(false);
            dispatch(clearMessages());
        }
    }, [progress, visible, dispatch]);

    const handleClose = () => {
        setVisible(false);
        dispatch(clearMessages());
    };

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: <FaCheckCircle className="text-green-500" /> };
            case 'error':
                return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: <FaTimesCircle className="text-red-500" /> };
            case 'warning':
                return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: <FaExclamationTriangle className="text-yellow-500" /> };
            case 'info':
                return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: <FaExclamationTriangle className="text-blue-500" /> };
            default:
                return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', icon: null };
        }
    };

    const styles = getAlertStyles();

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-90">
            <div className={`rounded-lg shadow-lg border ${styles.border} ${styles.bg} overflow-hidden`}>
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
                        <div className="flex-1">
                            <p className={`font-medium ${styles.text}`}>{message}</p>
                        </div>
                        <button onClick={handleClose} className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                            <FaTimes size={16} />
                        </button>
                    </div>
                </div>
                <div className="h-1 bg-gray-200">
                    <div
                        className="h-full transition-all duration-50 ease-linear"
                        style={{
                            width: `${progress}%`,
                            backgroundColor:
                                type === 'success' ? '#10B981' :
                                type === 'error' ? '#EF4444' :
                                type === 'warning' ? '#F59E0B' :
                                type === 'info' ? '#3B82F6' : '#6B7280'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}