"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Search, Phone, Mail, MapPin as MapPinIcon, Globe } from "lucide-react";
import { District } from "../types/district";

const Map = dynamic(() => import("./../components/sharadesh/map"), {
  ssr: false,
  loading: () => (
    <div className="h-150 w-full animate-pulse rounded-2xl flex items-center justify-center">
      
      Loading Map...
    </div>
  ),
});

export default function MapWrapper({ districts }: { districts: District[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDistricts = districts.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-10 px-4 md:px-0">
     
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1 w-12 bg-primary inline-block"></span>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">
              Explore Region
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-text-primary mb-4 leading-tight">
            Latest news from all over
            <span className="text-primary"> the country </span>on one map
          </h1>
          <p className="text-text-body text-lg leading-relaxed">
            Select your district and see the latest news, videos and breaking news from that region directly from the map.
          </p>
        </div>

        <div className="bg-section p-6 rounded-2xl border border-border shadow-sm">
          <label className="block text-sm font-semibold text-text-primary mb-3">
      Find your district
          </label>
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="example: Dhaka, Rangpur,..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <div className="mt-auto text-white p-8 rounded-3xl relative overflow-hidden group bg-text-primary">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Globe size={100} />
          </div>
          <h3 className="text-xl font-bold mb-6 relative z-10">
            PH News Contact
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-4 group/item">
              <div className="p-3 bg-white/10 rounded-xl group-hover/item:bg-primary transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Helpline</p>
                <p className="font-medium">+880 1234 567 890</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group/item">
              <div className="p-3 bg-white/10 rounded-xl group-hover/item:bg-primary transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Editorial Email</p>
                <p className="font-medium">news@ph-news.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group/item">
              <div className="p-3 bg-white/10 rounded-xl group-hover/item:bg-primary transition-colors">
                <MapPinIcon size={18} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Main Office</p>
                <p className="font-medium">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="w-full lg:w-2/3 h-125 lg:h-187 sticky top-10">
        <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative">
          <Map districts={filteredDistricts} />
          <div className="absolute bottom-6 right-6 z-1000 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-border flex items-center gap-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-text-primary uppercase tracking-tighter">
              Live Map Tracking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
