import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-sm backdrop-blur-lg supports-[backdrop-filter]:bg-white/90">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate('/')}>
                        <div className="relative">
                            <img src="/images/TalkFlow1.png"
                                className="h-8 w-8"
                                alt="TalkFlow Logo"
                            />
                            <div
                                className="absolute inset-0 -z-10 rounded-full opacity-20 blur-sm"
                                style={{ backgroundColor: "#004aad" }}
                            />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#004aad] to-[#38b6ff] bg-clip-text text-transparent">
                            TalkFlow
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/about"
                            className="font-medium text-gray-700 hover:text-[#004aad] transition-colors duration-200 relative group"
                        >
                            About
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#38b6ff] to-[#004aad] transition-all duration-300 group-hover:w-full"
                            />
                        </Link>
                        <Link
                            to="/contact"
                            className="font-medium text-gray-700 hover:text-[#004aad] transition-colors duration-200 relative group"
                        >
                            Contact
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#38b6ff] to-[#004aad] transition-all duration-300 group-hover:w-full"
                            />
                        </Link>
                        <button
                            onClick={()=>navigate('/login')}
                            className="px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                            style={{
                                background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-t animate-slideDown">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/download"
                                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-[#004aad] hover:bg-blue-50 transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ borderLeft: "4px solid #38b6ff" }}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-[#004aad] hover:bg-blue-50 transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ borderLeft: "4px solid #38b6ff" }}
                            >
                                Contact
                            </Link>
                            <button
                                className="px-6 py-3 mt-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                                style={{
                                    background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                                }}
                                onClick={() => navigate('/login')}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}