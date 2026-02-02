import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    document.title = "Contact Us - TalkFlow";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitted(false);
        }, 3000);
    };

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Us",
            info: "support@talkflow.com",
            subinfo: "Typically replies within 2 hours",
            color: "[#004aad]"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Call Us",
            info: "+212 6 123456798",
            subinfo: "Mon-Fri, 9am-6pm EST",
            color: "[#004aad]"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Visit Us",
            info: "Rabat - Morocco",
            subinfo: "Global headquarters",
            color: "[#004aad]"
        }
    ];

    return (
        <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(to right, #38b6ff 1px, transparent 1px),
                        linear-gradient(to bottom, #38b6ff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-gray-900">Let's Start a </span>
                        <span className="text-[#004aad]">
                            Conversation
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Have questions? We're here to help. Reach out and our team will get back to you as soon as possible.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="space-y-8">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#38b6ff]/30 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-xl bg-${info.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <div className='text-white'>
                                            {info.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                                        <p className="text-gray-900 font-medium mb-1">{info.info}</p>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Clock className="h-4 w-4" />
                                            {info.subinfo}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#38b6ff]/5 to-[#004aad]/5 border border-[#38b6ff]/20">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="h-6 w-6 text-[#004aad]" />
                                <h4 className="text-lg font-semibold text-gray-900">Fast Response Guarantee</h4>
                            </div>
                            <p className="text-gray-600 text-sm">
                                We pride ourselves on quick response times. Most inquiries receive a reply within 2 hours during business hours.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                            <div className="px-8 py-6 bg-gradient-to-r from-[#38b6ff]/10 to-[#004aad]/10 border-b border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900">Send us a message</h3>
                                <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
                            </div>
                            {isSubmitted && (
                                <div className="m-6 p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Message Sent Successfully!</h4>
                                            <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 2 hours.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className={`p-8 space-y-6 ${isSubmitted ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all"
                                            placeholder="How can we help you?"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20 outline-none transition-all resize-none"
                                            placeholder="Tell us about your project or inquiry..."
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        * Required fields
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        style={{
                                            background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        {isSubmitting ? (
                                            <>
                                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}