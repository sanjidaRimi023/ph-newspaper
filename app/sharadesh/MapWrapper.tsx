"use client"

import dynamic from "next/dynamic"

const Map = dynamic(
  () => import("@/app/components/sharadesh/map"),
  { ssr: false }
)

type District = {
  _id: string
  name: string
  division: string
  lat: number
  lng: number
}

export default function MapWrapper({
  districts,
}: {
  districts: District[]
}) {
  return <Map districts={districts} />
}
