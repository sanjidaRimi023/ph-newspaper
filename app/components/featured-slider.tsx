"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type News = {
  _id: string;
  title: string;
  slug: string;
  district: string;
  publishedAt: Date;
  coverImage: string;
};
type Props = {
  newsData: News[];
  current: number;
};

const FeaturedSlider = ({ newsData, current }: Props) => {
  return (
    <>
      <div className="relative overflow-hidden container mx-auto">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${current * 20}%)`,
          }}
        >
          {newsData.map((news) => (
            <div key={news._id} className="min-w-[25%] px-4 py-2">
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src={news?.coverImage}
                  alt={news.title}
                  width={350}
                  height={350}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-white bg-black/40 px-3 py-2">
                  <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
                  <span>{news.district}</span>
                  <Link
                    href={`/news/${news._id}`}
                    className="absolute top-10 right-3 h-9 w-9 flex items-center justify-center border hover:border-white text-white rounded-full
                             transition-colors duration-300
                             bg-primary border-primary"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0  bg-white  p-4">
                  <h3 className="text-lg font-semibold">{news.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedSlider;
