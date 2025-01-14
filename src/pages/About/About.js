import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import icon1 from "../../assets/images/delivery.png";
import icon2 from "../../assets/images/assortment.png";
import icon3 from "../../assets/images/consulting.png";
import icon4 from "../../assets/images/wallet.png";

const About = () => {
  const location = useLocation();
  // const [prevLocation, setPrevLocation] = useState("");
  // useEffect(() => {
  //   setPrevLocation(location.state.data);
  // }, [location]);
  return (
    <div className="container mx-auto my-[100px]">
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl mb-[50px] font-body">О нас</h1>
        <div className="flex flex-wrap justify-around gap-4 md:gap-10 lg:gap-20">
          <div className="text-center p-5 flex-1 min-w-[200px]">
            <img src={icon1} alt="Icon 1" className="w-16 h-16 mb-3 mx-auto" />
            <h2 className="text-lg mb-2 font-body">
              Быстрая доставка вашего заказа
            </h2>
            <p className="text-gray-500 font-body">
              У нас имеется так и доставка по городу, так и по всей территории
              Узбекистана
            </p>
          </div>
          <div className="text-center p-5 flex-1 min-w-[200px]">
            <img src={icon2} alt="Icon 2" className="w-16 h-16 mb-3 mx-auto" />
            <h2 className="text-lg mb-2 font-body">
              Разнообразие канцелярских товаров
            </h2>
            <p className="text-gray-500 font-small">
              Мы предлагаем широкий ассортимент качественной премиальной
              канцелярии собственного производства
            </p>
          </div>
          <div className="text-center p-5 flex-1 min-w-[200px]">
            <img src={icon3} alt="Icon 3" className="w-16 h-16 mb-3 mx-auto" />
            <h2 className="text-lg mb-2 font-body">Онлайн консультации</h2>
            <p className="text-gray-500 font-small">
              Наши эксперты готовы предоставить Вам персональную помощь и
              консультации онлайн
            </p>
          </div>
          <div className="text-center p-5 flex-1 min-w-[200px]">
            <img src={icon4} alt="Icon 4" className="w-16 h-16 mb-3 mx-auto" />
            <h2 className="text-lg mb-2 font-body">Удобные платежи</h2>
            <p className="text-gray-500 font-small">
              Оплачивайте свои покупки удобным образом
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
