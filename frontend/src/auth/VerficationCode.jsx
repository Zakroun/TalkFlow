import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setSuccessMessage, setWarnningMessage } from "../data/ChatSlice";
import { useDispatch } from "react-redux";

export default function VerificationCode() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isResending, setIsResending] = useState(false);
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const email = location.state?.email || "your email";

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        if (verificationCode.length === 6) {
            navigate("/reset-password", { state: { email, code: verificationCode } });
        }
    };

    const handleResendCode = async () => {
        setIsResending(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTimeLeft(300);
        setIsResending(false);
        dispatch(setSuccessMessage("Verification code resent successfully"));
    };

    const isCodeComplete = code.every(digit => digit !== "");

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-indigo-50">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800" />
                <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-center mix-blend-overlay opacity-20" />
                <div className="relative z-10 w-full p-12 flex flex-col justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/images/TalkFlow4.png" alt="img" className="w-10" />
                        <span className="text-2xl font-bold text-white">TalkFlow</span>
                    </div>
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold text-white mb-6">Verify Your Identity</h2>
                        <p className="text-blue-100 text-lg">
                            Enter the 6-digit verification code sent to your email to securely reset your password.
                        </p>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-blue-500 bg-blue-600 text-white"
                                    >
                                        <FaUser className="text-lg" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-blue-200 font-medium">Join 10,000+ active users</p>
                        </div>
                    </div>
                    <div className="text-blue-100">
                        <p className="text-sm">© 2024 TalkFlow. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center space-x-3">
                            <img src="/images/TalkFlow1.png" className="w-8" alt="TalkFlow Logo"/>
                            <span className="text-2xl font-bold text-gray-900">TalkFlow</span>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
                        <p className="text-gray-600">
                            We sent a 6-digit code to <span className="font-medium">{email}</span>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                                Enter the 6-digit code
                            </label>
                            <div className="flex justify-center gap-3">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">Code expires in: {formatTime(timeLeft)}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={timeLeft > 0 || isResending}
                                className={`text-sm ${timeLeft > 0 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-500'}`}
                            >
                                {isResending ? "Resending..." : timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : "Resend code"}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={!isCodeComplete}
                            className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Verify Code
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to="/forgot-password"
                            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Use a different email
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}