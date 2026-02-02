import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSuccessMessage, setWarnningMessage, setErrorMessage, login } from "../data/ChatSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = { email: "", password: "" };

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            dispatch(setWarnningMessage("Please fix form errors"));
            return;
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.email && formData.password) {
            dispatch(setSuccessMessage("Login successful!"));
            dispatch(login());
            navigate("/chat/chats");
        } else {
            dispatch(setErrorMessage("Invalid email or password"));
        }
        setIsLoading(false);
    };

    const handleSocialLogin = (provider) => {
        dispatch(setSuccessMessage(`${provider} login clicked`));
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
                        <h2 className="text-4xl font-bold text-white mb-6">Connect Seamlessly</h2>
                        <p className="text-blue-100 text-lg">
                            Join thousands of teams using TalkFlow to streamline their communication and collaboration.
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
                            <img src="/images/TalkFlow1.png" className="w-8" alt="TalkFlow Logo" />
                            <span className="text-2xl font-bold text-gray-900">TalkFlow</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            setErrors({ ...errors, email: "" });
                                        }}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all duration-200
                                            ${errors.email
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            setErrors({ ...errors, password: "" });
                                        }}
                                        className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition-all duration-200
                                            ${errors.password
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.remember}
                                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                        className="sr-only"
                                    />
                                    <div className={`h-5 w-5 rounded border flex items-center justify-center transition-colors
                                        ${formData.remember
                                            ? "bg-blue-500 border-blue-500"
                                            : "bg-white border-gray-300"
                                        }`}
                                    >
                                        {formData.remember && (
                                            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="ml-2 text-sm text-gray-700">Remember me</span>
                            </label>
                            <Link
                                to="/forget-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
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
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="my-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleSocialLogin("Google")}
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FcGoogle className="h-5 w-5 mr-2" />
                                Google
                            </button>
                            <button
                                onClick={() => handleSocialLogin("Facebook")}
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
                                Facebook
                            </button>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}