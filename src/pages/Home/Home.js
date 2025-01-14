import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import Karta from "../../assets/karta.png";
import Komment from "../../assets/coment.png";
import Karandash from "../../assets/karandash.png";
import Dostavka from "../../assets/dostavka.png"

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="container mx-auto px-5 lgl:px-10">
        <Sale />
        <NewArrivals />
        <BestSellers />
        <div className="my-5 w-full mx-auto grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <div className="flex flex-col items-center">
            <img src={Dostavka} alt="Dostavka" className="w-16 h-16 md:w-10 md:h-10" />
            <div className="icon-box-content card-body pt-4 text-center">
              <span className="font-heading text-[20px]">Быстрая доставка красоты</span>
              <br />
              <span className="text-gray-500 text-[15px] font-small mb-3">
                Мы осуществляем доставку наших товаров по всей территории Узбекистана
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Karandash} alt="Karandash" className="w-12 h-12 md:w-10 md:h-10" />
            <span className="text-center">
              <span className="font-heading text-[20px]">Разнообразие канцелярии</span>
              <br />
              <span className="text-gray-500 text-[15px] font-small mb-3">
                Мы предлагаем широкий ассортимент качественной канцелярии 
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img src={Komment} alt="Komment" className="w-12 h-12 md:w-10 md:h-10" />
            <span className="text-center">
              <span className="font-heading text-[20px]">Онлайн консультации</span>
              <br />
              <span className="text-gray-500 text-[15px] font-small mb-3">
                Наши эксперты готовы предоставить Вам персональную помощь и консультации онлайн
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img src={Karta} alt="Karta" className="w-12 h-12 md:w-10 md:h-10" />
            <span className="text-center">
              <span className="font-heading text-[20px]">Удобные платежи</span>
              <br />
              <span className="text-gray-500 text-[15px] font-small mb-3">
                Оплачивайте свои покупки удобным для Вас способом
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
