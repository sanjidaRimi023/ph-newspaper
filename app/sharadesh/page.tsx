import MapWrapper from "./MapWrapper"

async function getDistricts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/districts`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch districts")
    }

    return await res.json()
  } catch (err) {
    console.error("getDistricts error:", err);
    return [];
  }
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
