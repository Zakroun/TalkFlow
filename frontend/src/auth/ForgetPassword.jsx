import { useState } from "react";
import { Mail, ArrowLeft, MessageCircle } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { setSuccessMessage, setWarnningMessage } from "../data/ChatSlice";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let err = "";
        if (!email.trim()) {
            err = "Email is required";
        } else if (!emailRegex.test(email)) {
            err = "Invalid email address";
        }
        if (err) {
            setError(err);
            dispatch(setWarnningMessage(err));
            return;
        }
        setError("");
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        dispatch(setSuccessMessage("Verification code sent successfully"));
        navigate("/verification-code", { state: { email } });
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-indigo-50">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800" />
                <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-center mix-blend-overlay opacity-20" />
                <div className="relative z-10 w-full p-12 flex flex-col justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/images/TalkFlow4.png" alt="img" className="w-10" />
                        <span className="text-2xl font-bold text-white">TalkFlow</span>
                    </div>
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold text-white mb-6">Reset Your Password</h2>
                        <p className="text-blue-100 text-lg">
                            Enter your email address and we'll send you a verification code to reset your password.
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                        <p className="text-gray-600">We'll send a verification code to your email</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all duration-200
                                        ${error
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                            : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending Code...
                                </span>
                            ) : (
                                "Send Verification Code"
                            )}
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to sign in
                        </Link>
                    </div>
                    <p className="mt-8 text-center text-gray-600">
                        Need help?{" "}
                        <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}