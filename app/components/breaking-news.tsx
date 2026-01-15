import Link from "next/link";

type Props = {
  news: NewsData[];
};

const BreakingNews = ({ news }: Props) => {
  if (!news?.length) return null;

  return (
    <div className="relative flex items-center h-12 overflow-hidden bg-text-primary">
      <div className="z-10 flex items-center h-full px-6 bg-primary text-white font-bold uppercase tracking-wider text-xs skew-x-12 -ml-2">
        <span className="skew-x-12 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Breaking
        </span>
      </div>

      <div className="flex-1 flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] gap-12 px-8">
          {[...news, ...news].map((item, idx) => (
            <Link
              key={`${item._id}-${idx}`}
              href={`/news/${item.category}/${item._id}`}
              className="flex items-center gap-2 text-sm text-gray-100 transition-colors group"
            >
              <span className="text-primary font-bold">•</span>
              <span className="group-hover:underline underline-offset-4">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
