import { Mail, MapPin, Phone } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-gray-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38b6ff]/30 to-transparent" />
      </div> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
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
            <p className="text-gray-600 leading-relaxed">
              Revolutionizing communication with secure, real-time messaging for teams and individuals worldwide.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaXTwitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <FaFacebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <FaInstagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <FaLinkedin className="h-5 w-5" />, label: "LinkedIn" },
              ].map((social, index) => (
                <Link
                  key={index}
                  to="/"
                  className="group p-2 rounded-lg bg-white border border-gray-200 hover:border-[#38b6ff]/50 hover:bg-gradient-to-br from-[#38b6ff]/5 to-[#004aad]/5 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <div className="text-gray-500 group-hover:text-[#004aad] transition-colors">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Product</h3>
            <ul className="space-y-4">
              {["Features", "Download", "Pricing", "API", "Documentation"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-[#004aad] hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-4">
              {["About Us", "Careers", "Blog", "Press", "Partners"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-[#004aad] hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#38b6ff] mt-0.5" />
                <div>
                  <p className="text-gray-600">support@talkflow.com</p>
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#38b6ff] mt-0.5" />
                <div>
                  <p className="text-gray-600">+212 6 123456798</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#38b6ff] mt-0.5" />
                <div>
                  <p className="text-gray-600">Rabat - Morocco</p>
                  <p className="text-sm text-gray-500">Global headquarters</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="rounded-2xl bg-gradient-to-r from-[#38b6ff]/5 via-white to-[#004aad]/5 border border-gray-100 p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 text-center md:text-left">
              <p>© {currentYear} TalkFlow. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance", "Security"].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-gray-500 hover:text-[#004aad] text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2">
                <IoLogoAppleAppstore className="w-5 h-5" />
                App Store
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2">
                <FaGooglePlay className="w-5 h-5" />
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-[#38b6ff] border border-gray-200 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Back to top"
      >
        <svg
          className="h-6 w-6 text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}