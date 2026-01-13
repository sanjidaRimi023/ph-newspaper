import { Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";

export const NewsCard = ({
  item,
}: {
  item: NewsItem;
  variant: "large" | "medium";
}) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />

      <div>
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-[10px] font-bold uppercase tracking-wider">
            <Tag size={12} />
            {item.category}
          </span>
        </div>

        <h2>{item.title}</h2>

        <p>{item.description}</p>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary" />
            {item.date}
          </div>
          <div className="flex items-center gap-1.5 border-l border-slate-700 pl-4">
            <Clock size={14} className="text-primary" />
            {item.readTime}
          </div>
        </div>
      </div>
    </div>
  );
};
