import { Users, Globe, Zap} from "lucide-react";

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#38b6ff] animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-gray-900">Numbers That </span>
            <span className="bg-gradient-to-r from-[#004aad] to-[#38b6ff] bg-clip-text text-transparent">
              Speak Louder
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Join millions of users who trust TalkFlow for their communication needs
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {[
            {
              icon: <Users className="h-8 w-8" />,
              value: "10M+",
              label: "Active Users",
              description: "Global community growing daily",
              gradient: "from-[#38b6ff] to-[#004aad]",
              delay: "0"
            },
            {
              icon: <Zap className="h-8 w-8" />,
              value: "99.9%",
              label: "Uptime",
              description: "Industry-leading reliability",
              gradient: "from-[#004aad] to-[#38b6ff]",
              delay: "100"
            },
            {
              icon: <Globe className="h-8 w-8" />,
              value: "150+",
              label: "Countries",
              description: "Worldwide coverage",
              gradient: "from-[#38b6ff] to-[#004aad]",
              delay: "200"
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#38b6ff]/30 transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${stat.gradient}/10 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`bg-gradient-to-br ${stat.gradient} bg-clip-text text-white`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className={`text-4xl lg:text-5xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </h3>
              <p className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}