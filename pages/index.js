import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArticleCard from '../components/ArticleCard';
import ArticleImageCard from '../components/ArticleImageCard';
import Header from '../components/Header';
import FaceBookIcon from '../components/icons/FacebookIcon';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerCard from '../components/BannerCard';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const img =
  'https://s3-alpha-sig.figma.com/img/8bab/c6de/10e133c6518d8edcb5ca2d5585b71204?Expires=1684713600&Signature=Yv~n36DPo1ck0DWEPPa5~BpH0dzWPkqXkb5oXo982kZfE6v7XVCiKhC1GQ1gH~28JXv0Y77RgFzoVsXpKlC5IXcTpJDH0uQ3bSMur9G9Pf6aySIVJxQrBajFAUMdTJecu177Ff2CzaTHlPzT7A8iTcFaTDcXAkEJ5df0mm28RM0BZP1OmW2WrM70ddGrpyucCcDC1U-euGRPEVb2S8lOaaf6hgyOWmJvCwicsyh3BQiA2H2LhFgiIahM~aOW8q0fQ9cEGtLq7r~UrXVls8GGC1lv-lIrA1iENXbeJLw2-62Olc1~GNDz8Z3TndLpp3mqIIMlRyXxFHYu0XNFx~13mw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

const bgImgPath =
  'https://s3-alpha-sig.figma.com/img/8bab/c6de/10e133c6518d8edcb5ca2d5585b71204?Expires=1684713600&Signature=Yv~n36DPo1ck0DWEPPa5~BpH0dzWPkqXkb5oXo982kZfE6v7XVCiKhC1GQ1gH~28JXv0Y77RgFzoVsXpKlC5IXcTpJDH0uQ3bSMur9G9Pf6aySIVJxQrBajFAUMdTJecu177Ff2CzaTHlPzT7A8iTcFaTDcXAkEJ5df0mm28RM0BZP1OmW2WrM70ddGrpyucCcDC1U-euGRPEVb2S8lOaaf6hgyOWmJvCwicsyh3BQiA2H2LhFgiIahM~aOW8q0fQ9cEGtLq7r~UrXVls8GGC1lv-lIrA1iENXbeJLw2-62Olc1~GNDz8Z3TndLpp3mqIIMlRyXxFHYu0XNFx~13mw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

const articleImg =
  'https://s3-alpha-sig.figma.com/img/8bab/c6de/10e133c6518d8edcb5ca2d5585b71204?Expires=1684713600&Signature=Yv~n36DPo1ck0DWEPPa5~BpH0dzWPkqXkb5oXo982kZfE6v7XVCiKhC1GQ1gH~28JXv0Y77RgFzoVsXpKlC5IXcTpJDH0uQ3bSMur9G9Pf6aySIVJxQrBajFAUMdTJecu177Ff2CzaTHlPzT7A8iTcFaTDcXAkEJ5df0mm28RM0BZP1OmW2WrM70ddGrpyucCcDC1U-euGRPEVb2S8lOaaf6hgyOWmJvCwicsyh3BQiA2H2LhFgiIahM~aOW8q0fQ9cEGtLq7r~UrXVls8GGC1lv-lIrA1iENXbeJLw2-62Olc1~GNDz8Z3TndLpp3mqIIMlRyXxFHYu0XNFx~13mw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

function Home() {
  const [newArticles, setNewArticles] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(true)
  const [newBanners, setNewBanners] = useState([]);

  // article fetch
  function fetchNewArticles() {
    axios.get(`${BACKEND_URL}/posts`).then((res) => setNewArticles(res.data));
  }

  function fetchNewBanners() {
    setBannerLoading(true);
    axios.get(`${BACKEND_URL}/banners`).then((res) => setNewBanners(res.data)).finally(() => setBannerLoading(false));
  }

  useEffect(() => {
    fetchNewArticles();
    fetchNewBanners();
  }, []);

  return (
    <section className="">
      <section className="absolute z-10 w-full">
        <Header />
      </section>
      <section className="relative">
        {bannerLoading && (
          <section className='h-screen bg-black w-full flex justify-center items-center'>
            <h1 className='text-white'>Өгөгдөл татаж байнаа ...</h1>
          </section>
        )}
        {!bannerLoading && (
          <Swiper
            slidesPerView={1}
          >
            {newBanners.map((banner) => (
              <SwiperSlide>
                <BannerCard
                  image={banner.image}
                  title={banner.title}
                  description={banner.description} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
      <section className="mx-10 mt-10">
        <h1 className="text-2xl">Шинэ мэдээ</h1>
        <section>
          <section className="mt-2">
            <ul className="flex gap-5">
              <button>All</button>
              <button>Adventure</button>
              <button>Travel</button>
              <button>Fashion</button>
              <button>Technology</button>
              <button>Branding</button>
            </ul>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {newArticles.map((article) => (
              <ArticleCard
                href={`/articles/${article._id}`}
                tag={article?.tag}
                title={article?.title}
                image={article?.image || articleImg}
                description={article?.description}
              />
            ))}
          </section>
        </section>
      </section>
      <section className="screen-60 mt-20 relative">
        <img src={img} className="w-full h-full fill-slate-500" />
        <section
          className="absolute bg-black top-0 w-full h-full "
          style={{ backgroundColor: 'rgba(0,0,0, 0.18)' }}
        >
          <section className="flex flex-col h-full justify-center items-center">
            <section className="bg-black px-3 py-1 rounded-md">
              <h3 className="text-white text-xs">ADVENTURE</h3>
            </section>
            <h3 className="text-white text-3xl max-w-[530px] text-center">
              Richird Norton photorealistic rendering as real photos
            </h3>

            <h5 className="max-w-[420px] mt-1 text-white text-center">
              Progressively incentivize cooperative systems through technically
              sound functionalities. The credibly productivate seamless data.
            </h5>
            <div className="w-[60px] h-px bg-white mt-4"></div>
            <h3 className="text-white mt-4 text-center">08.08.2023</h3>
          </section>
        </section>
      </section>
      <section className="mx-10 mt-10">
        <h1 className="text-2xl">Editor’s Pick</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          <ArticleImageCard image={bgImgPath} />
          <ArticleImageCard image={articleImg} />
          <ArticleImageCard image={bgImgPath} />
        </section>
      </section>
      <section className="mt-10 footer bg-black px-10 py-14 grid grid-cols-4 gap-4">
        <section>
          <ul className="text-white">
            <li className="">Contact the Publisher</li>
            <li>mike@runo.com</li>
            <li>+944 450 904 505</li>
          </ul>
        </section>
        <section>
          <ul className="text-white">
            <li className="">Explorate</li>
            <li>About</li>
            <li>Partners</li>
            <li>Job Opportunities</li>
          </ul>
        </section>
        <section>
          <ul className="text-white">
            <li className="">Headquarter</li>
            <li>191 Middleville Road, NY 1001, Sydney Australia</li>
          </ul>
        </section>
        <section>
          <ul className="text-white">
            <li className="">Connections</li>
            <li>
              <FaceBookIcon />
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
}

export default Home;
