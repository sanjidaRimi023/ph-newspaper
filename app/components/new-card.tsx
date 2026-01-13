import { Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";

export const NewsCard = ({
  item,
  variant,
}: {
  item: NewsItem;
  variant: "large" | "medium";
}) => {
  const height = variant === "large" ? "h-[420px] lg:h-[520px]" : "h-[240px]";

  return (
    <article className={`relative w-full ${height}`}>
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover"
        priority={variant === "large"}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-0 left-0 p-5 text-white space-y-2">
        <span className="flex items-center gap-1 text-xs uppercase bg-primary w-fit px-2 py-1 rounded-2xl font-semibold">
          <Tag size={12} />
          {item.category}
        </span>

        <h2
          className={`font-bold leading-tight ${
            variant === "large" ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          {item.title}
        </h2>

        {variant === "large" && (
          <p className="text-sm text-slate-200 underline">{item.description}</p>
        )}

        <div className="flex gap-4 text-xs pt-1">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {item.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {item.readTime}
          </span>
        </div>
      </div>
    </article>
  );
};
