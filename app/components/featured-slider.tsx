"use client";

import Image from "next/image";

type News = {
  _id: string;
  title: string;
  coverImage: string;
};
type Props = {
  newsData: News[];
  current: number;
};

const FeaturedSlider = ({ newsData, current }: Props) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${current * 20}%)`,
          }}
        >
          {newsData.map((news) => (
            <div key={news._id} className="min-w-[25%] px-2">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={news?.coverImage}
                  alt={news.title}
                  width={350}
                  height={350}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
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
