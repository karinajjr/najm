import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import ItemCard from "./ItemCard";
import { emptyCart } from "../../assets/images";

const Cart = () => {
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.orebiReducer.saved);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    saved.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [saved]);
  useEffect(() => {
    if (totalAmt <= 200000) {
      setShippingCharge(30000);
    } else if (totalAmt <= 400000) {
      setShippingCharge(25000);
    } else if (totalAmt > 400000) {
      setShippingCharge(20000);
    }
  }, [totalAmt]);

  const formatPrice = (price) => {
    // Convert to string and handle potential decimals
    const priceStr = Math.round(price).toString();
    
    // Split into groups of 3 from the right
    return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="container mx-auto">
      <Breadcrumbs title="Корзина" />
      {saved.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Продукт</h2>
            <h2>Цена</h2>
            <h2>Количество</h2>
            <h2>Итоговая цена</h2>
          </div>
          <div className="mt-5">
            {saved.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Очистить корзину
          </button>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Результаты</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Цена
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatPrice(totalAmt)} сумов
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Стоимость доставки
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatPrice(shippingCharge)} сумов
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Итоговая цена
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {formatPrice(totalAmt + shippingCharge)} сумов
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Перейти к оформлению
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Ваша корзина пуста
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Ваша корзина создана, чтобы служить вам. Дайте ей цель — наполните
              её канцелярскими товарами, и сделайте её счастливой.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Продолжить покупку
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
