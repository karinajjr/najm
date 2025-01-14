import React from "react";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
const Footer = () => {
  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="container flex flex-wrap sml:flex-nowrap gap-8 w-full md:mx-auto md:grid md:grid-cols-2 xl:grid-cols-3 px-4 md:justify-items-center">
        <div className="md:col-span-1">
          <FooterListTitle title="Больше о нас" />
          <div className="flex flex-col gap-6">
            <ul className="flex items-center gap-2">
              <a
                href="https://t.me/najmstationery"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-16 h-16 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaTelegram />
                </li>
              </a>
              <a
                href="https://instagram.com/najm___uz"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-16 h-16 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="md:col-span-1">
          <FooterListTitle title="Магазин" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Ежедневники
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Ручки и Карандаши
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Тетради
            </li>
          </ul>
        </div>
        <div className="md:col-span-1">
          <FooterListTitle title="Аккаунт" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Профиль
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Заказы
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
