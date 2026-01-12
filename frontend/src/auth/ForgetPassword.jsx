import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        navigate("/verification-code", { state: { email } });
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
                        Forgot Password?
                    </h1>
                    <p className="text-gray-600">
                        We'll send a verification code to your email
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Enter your email to receive a 6-digit verification code
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                            }}
                        >
                            {isLoading ? "Sending Code..." : "Send Verification Code"}
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 text-[#004aad] hover:text-[#38b6ff] transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to sign in
                        </Link>
                    </div>
                    <p className="mt-8 text-center text-gray-600">
                        Need help?{" "}
                        <Link to="/contact" className="font-medium text-[#004aad] hover:text-[#38b6ff] transition-colors">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}