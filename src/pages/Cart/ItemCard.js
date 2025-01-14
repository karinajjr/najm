import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Skeleton } from "../../components/ui/skeleton";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";

const formatPrice = (price) => {
  // Convert to string and handle potential decimals
  const priceStr = Math.round(price).toString();
  
  // Split into groups of 3 from the right
  return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(deleteItem(item.id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        {item.images?.length > 0 ? (
          <img
            className="w-32 h-32"
            src={item.images[0].image}
            alt="productImage"
          />
        ) : (
          <Skeleton className="w-32 h-32 rounded-xl" />
        )}
        <h1 className="font-titleFont font-semibold text-xl text-primeColor">
          {item.name}
        </h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {formatPrice(item.price)} сумов
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ id: item.id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{formatPrice(item.quantity * item.price)} сумов</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
