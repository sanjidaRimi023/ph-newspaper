"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import Link from "next/link"

type District = {
  _id: string
  name: string
  division: string
  lat: number
  lng: number
}

const icon = new L.Icon({
  iconUrl: "/markericon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function Map({ districts }: { districts: District[] }) {
  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      className="h-150 w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {districts.map(d => (
        <Marker key={d._id} position={[d.lat, d.lng]} icon={icon}>
          <Popup>
            <h3 className="font-semibold">{d.name}</h3>
            <p>{d.division}</p>
            <Link href={`/sharadesh/${d._id.toLowerCase()}`}>
              View News
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
