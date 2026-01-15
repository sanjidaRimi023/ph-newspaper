"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white pt-16 pb-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
      
          <div className="space-y-6">
            <Link
              href="/"
              className="text-3xl font-black tracking-tighter uppercase"
            >
              PH<span className="text-primary">NEWS</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.

            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Karwan bazar, Dhaka,Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+88017548495</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@phnews.com</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <Link
                href="/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="/"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="/"
                aria-label="Youtube"
                className="w-10 h-10 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>

     
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-bold">
          <p>© {currentYear} PH News. All Rights Reserved.</p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
