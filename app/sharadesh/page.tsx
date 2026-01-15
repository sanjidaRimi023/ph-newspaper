import MapWrapper from "./MapWrapper"

async function getDistricts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/districts`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch districts")
  }

  return res.json()
}

export default async function SaraDeshPage() {
  const districts = await getDistricts()

  return (
    <section className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sara Desh</h1>
      <MapWrapper districts={districts} />
    </section>
  )
}
