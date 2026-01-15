"use client";

import Link from "next/link";
import { Home, Newspaper, LifeBuoy, Mail, ArrowRight } from "lucide-react";

export default function NotFound() {
  const suggestions = [
    {
      title: "Latest Headlines",
      desc: "Stay updated with the breaking news and top stories.",
      icon: <Newspaper className="text-blue-600" />,
      link: "/",
    },
    {
      title: "Support Desk",
      desc: "Need assistance? Our help center is here for you 24/7.",
      icon: <LifeBuoy className="text-purple-600" />,
      link: "/",
    },
    {
      title: "Get in Touch",
      desc: "Contact our newsroom or report a technical issue.",
      icon: <Mail className="text-emerald-600" />,
      link: "/",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f8fafc] font-sans selection:bg-red-100 selection:text-red-900">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-red-200/40 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[100px]" />

      <div className="relative z-10 w-full max-w-5xl px-6 py-12">
        <div className="backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 text-center">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none opacity-20 pointer-events-none">
            <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-900 leading-none">
              404
            </h1>
          </div>

          <div className="relative z-20">
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest">
                Page Not Found
              </span>
            </div>

            <h2 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">
              Lost in the Headlines?
            </h2>

            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              We could not find the page you are looking for. It might have been
              moved, archived, or the URL might be incorrect. Lets get you back
              on track.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
              {suggestions.map((item, index) => (
                <Link key={index} href={item.link} className="group">
                  <div className="h-full backdrop-blur-sm bg-white/40 border border-white hover:border-red-100 p-8 rounded-3xl hover:bg-white/80 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-xl">
                    <div className="mb-5 p-3 bg-slate-50 w-fit rounded-2xl group-hover:bg-red-50 transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 flex items-center justify-between text-slate-900">
                      {item.title}
                      <ArrowRight
                        size={18}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-500"
                      />
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-400"
              >
                <Home size={20} />
                Return Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-10 py-4 bg-gray-300 text-slate-600 font-semibold rounded-2xl transition-all shadow-lg hover:shadow-gray-400"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
