import { useState } from "react";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setSuccessMessage, setWarnningMessage } from "../data/ChatSlice";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const passwordRequirements = [
        { label: "At least 8 characters", met: formData.password.length >= 8 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
        { label: "Contains number", met: /\d/.test(formData.password) },
    ];

    const validateForm = () => {
        const newErrors = { password: "", confirmPassword: "" };

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

        setErrors(newErrors);
        return !newErrors.password && !newErrors.confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            dispatch(setWarnningMessage("Please fix form errors"));
            return;
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(setSuccessMessage("Password reset successfully!"));
        navigate("/login");
        setIsLoading(false);
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
                            Create a strong new password to secure your TalkFlow account.
                        </p>
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
                            <img src="/images/TalkFlow1.png" className="h-8 w-8" alt="TalkFlow Logo" />
                            <span className="text-2xl font-bold text-gray-900">TalkFlow</span>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                        <p className="text-gray-600">Create a new secure password for your account</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
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
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                {passwordRequirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? "bg-green-100" : "bg-white"}`}>
                                            {req.met && (
                                                <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
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
                                Confirm New Password
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
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
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
                                    Resetting password...
                                </span>
                            ) : (
                                "Reset Password"
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
                </div>
            </div>
        </div>
    );
}