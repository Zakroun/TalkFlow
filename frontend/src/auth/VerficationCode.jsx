import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function VerificationCode() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isResending, setIsResending] = useState(false);
    const inputsRef = useRef([]);
    const navigate = useNavigate();
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
        
        setTimeLeft(300);
        setIsResending(false);
    };

    const isCodeComplete = code.every(digit => digit !== "");

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
                        Enter Verification Code
                    </h1>
                    <p className="text-gray-600">
                        We sent a 6-digit code to <span className="font-medium">{email}</span>
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                                        className="w-14 h-14 text-center text-2xl font-bold rounded-lg border-2 border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
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
                                className={`text-sm ${timeLeft > 0 ? 'text-gray-400' : 'text-[#004aad] hover:text-[#38b6ff]'}`}
                            >
                                {isResending ? "Resending..." : timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : "Resend code"}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={!isCodeComplete}
                            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                            }}
                        >
                            Verify Code
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to="/forget-password"
                            className="flex items-center justify-center gap-2 text-[#004aad] hover:text-[#38b6ff] transition-colors"
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