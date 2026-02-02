export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-[#38b6ff]/20 to-transparent rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tl from-[#004aad]/15 to-transparent rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute top-3/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-tr from-[#38b6ff]/10 to-transparent rounded-full blur-2xl animate-float-slow" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #38b6ff10 1px, transparent 1px),
            linear-gradient(to bottom, #38b6ff10 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full border border-[#38b6ff]/10 animate-ping-slow" />
      </div>

      <div className="container mx-auto max-w-5xl text-center relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-slide-up">
          <span className="block text-gray-900">Talk Flow - Modern Messaging</span>
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-[#004aad]">
              Made Simple
            </span>
          </span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up delay-100">
          TalkFlow is a{" "}
          <span className="font-semibold text-[#004aad] relative">
            fast, secure, and real-time
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#38b6ff] to-[#004aad] rounded-full" />
          </span>{" "}
          messaging platform built for teams and friends. Experience seamless communication like never before.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 animate-slide-up delay-200">
          <button className="animated-button rounded-2xl">
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className="text">Get Started</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>

          <button className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-medium text-gray-700 hover:text-[#004aad] transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-white/50 hover:border-[#38b6ff]/30 shadow-lg hover:shadow-xl">
            <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M10 8L16 12L10 16V8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Watch Demo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
