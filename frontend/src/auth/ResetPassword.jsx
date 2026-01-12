import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    // const location = useLocation();
    // const email = location.state?.email || "your email";
    const passwordRequirements = [
        { label: "At least 8 characters", met: formData.password.length >= 8 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
        { label: "Contains number", met: /\d/.test(formData.password) },
    ];

    const allRequirementsMet = passwordRequirements.every(req => req.met);
    const passwordsMatch = formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!allRequirementsMet || !passwordsMatch) return;
        setIsSubmitting(true);
        
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img src="/images/TalkFlow1.png"
                                className="h-16 w-16"
                                alt="TalkFlow Logo"
                            />
                            <div
                                className="absolute inset-0 -z-10 rounded-full opacity-20 blur-sm"
                                style={{ backgroundColor: "#004aad" }}
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Reset Password
                    </h1>
                    <p className="text-gray-600">
                        Create a new secure password
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Password Reset Successful!
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Your password has been successfully updated. Redirecting to login...
                            </p>
                            <div className="mt-6">
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 animate-progress" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <div className="mt-3 space-y-2">
                                    {passwordRequirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-100' : 'bg-gray-100'}`}>
                                                {req.met && <CheckCircle className="h-3 w-3 text-green-600" />}
                                            </div>
                                            <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className={`w-full pl-12 pr-12 py-3 rounded-lg border ${passwordsMatch ? 'border-gray-300' : 'border-red-300'} focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all`}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {formData.confirmPassword && !passwordsMatch && (
                                    <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={!allRequirementsMet || !passwordsMatch || isSubmitting}
                                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                                }}
                            >
                                {isSubmitting ? "Updating..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                    {!isSuccess && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <Link
                                to="/login"
                                className="flex items-center justify-center gap-2 text-[#004aad] hover:text-[#38b6ff] transition-colors"
                            >
                                Back to sign in
                            </Link>
                        </div>
                    )}
                    <style jsx global>{`
                            @keyframes progress {
                                from { width: 0%; }
                                to { width: 100%; }
                            }
                            .animate-progress {
                                animation: progress 2s ease-in-out;
                            }
                            `}
                    </style>
                </div>
            </div>
        </div>
    );
}