import { Target,Rocket, Users, Globe, Shield, Zap } from "lucide-react";

export default function About() {
    document.title = "About Us - TalkFlow";
    return (
        <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(to right, #38b6ff 1px, transparent 1px),
                        linear-gradient(to bottom, #38b6ff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-gray-900">Redefining </span>
                        <span className="text-[#004aad]">
                            Digital Communication
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Born from a vision to connect the world with secure, instant, and meaningful conversations.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:border-[#38b6ff]/30 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute -top-4 left-8">
                            <div className="w-12 h-12 rounded-xl bg-[#38b6ff] flex items-center justify-center">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 pt-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            To empower every individual and organization with communication tools that are not just fast and reliable, but also secure and intuitive. We believe that great conversations build great relationships.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#38b6ff] mt-2 flex-shrink-0" />
                                <p className="text-gray-600">Break down communication barriers worldwide</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#38b6ff] mt-2 flex-shrink-0" />
                                <p className="text-gray-600">Protect privacy as a fundamental human right</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#38b6ff] mt-2 flex-shrink-0" />
                                <p className="text-gray-600">Foster collaboration through seamless interaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:border-[#004aad]/30 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute -top-4 left-8">
                            <div className="w-12 h-12 rounded-xl bg-[#004aad] flex items-center justify-center">
                                <Rocket className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 pt-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            To become the world's most trusted communication platform, where distance and time zones never hinder meaningful connections. We envision a future where everyone can communicate freely, securely, and effortlessly.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#004aad] mt-2 flex-shrink-0" />
                                <p className="text-gray-600">Connect 1 billion people by 2030</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#004aad] mt-2 flex-shrink-0" />
                                <p className="text-gray-600">Pioneer AI-assisted communication</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#004aad] mt-2 flex-shrink-0" />
                                <p className="text-gray-600">Set new standards for digital privacy</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Our Core Values
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Shield className="h-8 w-8" />,
                                title: "Security First",
                                description: "Privacy isn't optional—it's our foundation.",
                                color: "[#004aad]"
                            },
                            {
                                icon: <Zap className="h-8 w-8" />,
                                title: "Speed & Reliability",
                                description: "Instant communication without compromise.",
                                color: "[#004aad]"
                            },
                            {
                                icon: <Users className="h-8 w-8" />,
                                title: "User-Centric",
                                description: "Designed with real people in mind.",
                                color: "[#004aad]"
                            },
                            {
                                icon: <Globe className="h-8 w-8" />,
                                title: "Global Impact",
                                description: "Building bridges across cultures.",
                                color: "[#004aad]"
                            }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-${value.color} mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <div className='text-white'>
                                        {value.icon}
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="mb-20">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Our Journey
                    </h3>
                    <div className="relative">
                        <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 h-full w-px bg-gradient-to-b from-[#38b6ff] via-[#004aad] to-[#38b6ff]" />
                        <div className="space-y-12">
                            {[
                                { year: "2018", title: "Foundation", desc: "TalkFlow was born in a small San Francisco garage", milestone: "First prototype" },
                                { year: "2019", title: "Launch", desc: "Official launch with 10,000 early adopters", milestone: "10K users" },
                                { year: "2020", title: "Growth", desc: "Expanded to 50 countries during pandemic", milestone: "1M users" },
                                { year: "2022", title: "Innovation", desc: "Introduced AI features and enhanced security", milestone: "Series B funding" },
                                { year: "2024", title: "Today", desc: "Serving millions with cutting-edge technology", milestone: "10M+ users" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                                        }`}
                                >
                                    <div className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'
                                        }`}>
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#38b6ff] to-[#004aad] opacity-10" />
                                        <div className="text-2xl font-bold bg-gradient-to-br from-[#004aad] to-[#38b6ff] bg-clip-text text-transparent">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                                        <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#38b6ff]/30 transition-all duration-300 hover:shadow-lg">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                            <p className="text-gray-600 mb-4">{item.desc}</p>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#38b6ff]/10 to-[#004aad]/10 text-[#004aad] text-sm font-medium">
                                                <Award className="h-4 w-4" />
                                                {item.milestone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
}