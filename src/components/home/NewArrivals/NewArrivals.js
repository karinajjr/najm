import React, { useMemo } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Karandash from "../../../assets/karandash.png";

// Заранее заданные продукты для примера
const demoProducts = [
  {
    id: 1,
    name: "Продукт 1",
    price: "1200",
    image: Karandash,
  },
  {
    id: 2,
    name: "Продукт 2",
    price: "1500",
    image: Karandash,
  },
  {
    id: 3,
    name: "Продукт 3",
    price: "1700",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Продукт 4",
    price: "1800",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Продукт 5",
    price: "2000",
    image: "https://via.placeholder.com/150",
  },
];

const NewArrivals = () => {
  const settings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    []
  );

  return (
    <div className="w-full pb-16">
      <Heading heading="Новинки" className="text-base font-small border border-red-950" />
      {/* <Slider {...settings}>
        {demoProducts.map((product) => (
          <div className="px-1" key={product.id}>
            <div className="p-2 rounded-lg bg-white ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full mb-3 rounded object-cover h-28 sm:h-38 md:h-32 lg:h-36"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600 font-small">{product.price} ₽</p>
            </div>
          </div>
        ))}
      </Slider> */}
    </div>
  );
};

export default NewArrivals;
