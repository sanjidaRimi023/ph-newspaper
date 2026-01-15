import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

async function getSingleNews(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/news/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("getSingleNews error in OG route:", err);
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#020617",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          Missing news id
        </div>
      ),
      size
    );
  }

  const news = await getSingleNews(id);

  if (!news) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#020617",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          News not found
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundImage: `url(${news.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: 64,
        }}
      >
        {/* dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              color: "#38bdf8",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            {news.category} • {news.district}
          </div>

          <div
            style={{
              color: "white",
              fontSize: 56,
              fontWeight: 900,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {news.title}
          </div>
        </div>
      </div>
    ),
    size
  );
}
