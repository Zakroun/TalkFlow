import { Zap, Lock, Users, MessageSquare, Globe, Shield, Bell, FileText, Video, Smile, Cloud, BarChart } from "lucide-react";

export default function Features() {
  const mainFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Messaging",
      desc: "Instant delivery with <50ms latency powered by WebSocket technology",
      gradient: "from-[#38b6ff] to-[#004aad]",
      stats: "Zero lag",
      delay: "0"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Military-Grade Security",
      desc: "End-to-end encryption with 256-bit AES & perfect forward secrecy",
      gradient: "from-[#004aad] to-[#38b6ff]",
      stats: "100% Private",
      delay: "100"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Smart Group Chats",
      desc: "Manage unlimited members with advanced moderation tools & roles",
      gradient: "from-[#38b6ff] to-[#004aad]",
      stats: "∞ Members",
      delay: "200"
    },
  ];

  const additionalFeatures = [
    { icon: <MessageSquare />, title: "Unlimited Chat History", desc: "Never lose a message" },
    { icon: <Globe />, title: "Global Reach", desc: "Available in 50+ languages" },
    { icon: <Shield />, title: "Self-Destructing Messages", desc: "Enhanced privacy controls" },
    { icon: <Bell />, title: "Smart Notifications", desc: "AI-powered prioritization" },
    { icon: <FileText />, title: "File Sharing", desc: "Up to 10GB per file" },
    { icon: <Video />, title: "HD Video Calls", desc: "4K quality with 25 participants" },
    { icon: <Smile />, title: "Emoji & GIF Library", desc: "Thousands of reactions" },
    { icon: <Cloud />, title: "Cloud Sync", desc: "Seamless device switching" },
    { icon: <BarChart />, title: "Analytics Dashboard", desc: "Team performance insights" },
  ];

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#38b6ff]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#004aad]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-gray-900">Features That </span>
            <span className="text-[#004aad]">
              Transform Communication
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need for seamless, secure, and scalable communication
            in one powerful platform.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-500"
            >
              <div className='relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-[#004aad]'>
                <div className='text-white'>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#004aad] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.desc}
              </p>
              <div className="flex items-center gap-2 text-[#004aad] font-medium group-hover:gap-3 transition-all duration-300 cursor-pointer">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-transparent via-[#38b6ff]/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            And So Much More...
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#38b6ff]/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#38b6ff]/10 to-[#004aad]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-[#004aad] to-[#38b6ff] bg-clip-text text-[#004aad]">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#004aad] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#38b6ff]/10 via-[#004aad]/5 to-[#38b6ff]/10" />
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, #38b6ff15 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #004aad15 0%, transparent 50%)`,
            }}
          />
          <div className="relative py-16 px-8 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Communication?
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join millions who've upgraded their messaging experience with TalkFlow
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #38b6ff 0%, #004aad 100%)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Start Free Trial</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}