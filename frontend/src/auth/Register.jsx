import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Check, MessageCircle } from "lucide-react";
import { FaFacebook, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { setSuccessMessage, setWarnningMessage } from "../data/ChatSlice";
import { useDispatch } from "react-redux";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: ""
    });

    const passwordRequirements = [
        { label: "At least 8 characters", met: formData.password.length >= 8 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
        { label: "Contains number", met: /\d/.test(formData.password) },
    ];

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerms: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (!passwordRequirements.every(r => r.met)) {
            newErrors.password = "Password is too weak";
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "You must accept terms";
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.password &&
            !newErrors.confirmPassword && !newErrors.agreeTerms;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            dispatch(setWarnningMessage("Please fix form errors"));
            return;
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(setSuccessMessage("Account created successfully!"));
        navigate("/login");
        setIsLoading(false);
    };

    const handleSocialRegister = (provider) => {
        dispatch(setSuccessMessage(`${provider} registration clicked`));
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
                        <h2 className="text-4xl font-bold text-white mb-6">Start Your Journey</h2>
                        <p className="text-blue-100 text-lg">
                            Join thousands of professionals using TalkFlow to enhance their communication and collaboration experience.
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Join TalkFlow and start collaborating today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            setErrors({ ...errors, name: "" });
                                        }}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all duration-200
                                            ${errors.name
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                                )}
                            </div>
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
                                        autoComplete="email"
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
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
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
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    {passwordRequirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? "bg-green-100" : "bg-white"}`}>
                                                {req.met && <Check className="h-3 w-3 text-green-600" />}
                                            </div>
                                            <span className={`text-xs ${req.met ? "text-green-600" : "text-gray-500"}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => {
                                            setFormData({ ...formData, confirmPassword: e.target.value });
                                            setErrors({ ...errors, confirmPassword: "" });
                                        }}
                                        className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition-all duration-200
                                            ${errors.confirmPassword
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="relative flex items-center h-5">
                                <input
                                    type="checkbox"
                                    checked={formData.agreeTerms}
                                    onChange={(e) => {
                                        setFormData({ ...formData, agreeTerms: e.target.checked });
                                        setErrors({ ...errors, agreeTerms: "" });
                                    }}
                                    className="sr-only"
                                />
                                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-colors
                                    ${formData.agreeTerms
                                        ? "bg-blue-500 border-blue-500"
                                        : "bg-white border-gray-300"
                                    }`}
                                >
                                    {formData.agreeTerms && (
                                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <label className="ml-2 text-sm text-gray-700 cursor-pointer">
                                I agree to the{" "}
                                <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {errors.agreeTerms && (
                            <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
                        )}
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
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
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
                                onClick={() => handleSocialRegister("Google")}
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FcGoogle className="h-5 w-5 mr-2 text-red-500" />
                                Google
                            </button>
                            <button
                                onClick={() => handleSocialRegister("Facebook")}
                                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
                                Facebook
                            </button>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}