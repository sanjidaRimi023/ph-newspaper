// app/saradesh/[district]/page.tsx
type Props = {
  params: { district: string }
}


async function getDistrictNews(district: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/news/by-district?district=${district}`,
    { cache: "no-store" }
  )
  return res.json()
}

export default async function DistrictPage({ params }: Props) {
  const news = await getDistrictNews(params.district)

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        News from {params.district}
      </h1>

      <ul className="space-y-3">
        {news.map((n: NewsData) => (
          <li key={n._id} className="border p-3 rounded">
            <h2 className="font-medium">{n.title}</h2>
            <p className="text-sm text-gray-500">{n.category}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
