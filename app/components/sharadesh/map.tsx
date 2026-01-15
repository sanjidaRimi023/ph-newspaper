"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin, ArrowRight, MapPinIcon } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { District } from "@/app/types/district";

const customIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <div className="absolute h-8 w-8 bg-primary/20 rounded-full animate-ping"></div>
      <MapPin color="#FF4646" fill="#FF4646" size={22} fillOpacity={0.3} />
    </div>
  ),
  className: "custom-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function RecenterMap({ districts }: { districts: District[] }) {
  const map = useMap();
  if (districts.length === 1) {
    map.flyTo([districts[0].lat, districts[0].lng], 9);
  }
  return null;
}

export default function Map({ districts }: { districts: District[] }) {
  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterMap districts={districts} />

      {districts.map((d) => (
        <Marker key={d._id} position={[d.lat, d.lng]} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="p-1 min-w-37">
              <h3 className="font-bold text-text-primary text-lg border-b border-border pb-1 mb-2">
                {d.name}
              </h3>
              <p className="text-text-muted text-xs mb-3 flex items-center gap-1">
                <MapPinIcon size={12} /> {d.division} District
              </p>
              <Link
                href={`/sharadesh/${d._id}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors group "
              >
                See the News{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
