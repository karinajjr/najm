import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { addToCart, deleteSaved } from "../../redux/orebiSlice";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";

const SavedItem = ({ item }) => {
  const dispatch = useDispatch();

  console.log(item);

  const formatPrice = (price) => {
    const priceStr = String(price);
    const length = priceStr.length;

    if (length === 4) {
      // 4 digits: space after the first digit
      return `${priceStr[0]} ${priceStr.slice(1)}`;
    } else if (length === 5) {
      // 5 digits: space after the second digit
      return `${priceStr.slice(0, 2)} ${priceStr.slice(2)}`;
    } else if (length === 6) {
      // 6 digits: space after the third digit
      return `${priceStr.slice(0, 3)} ${priceStr.slice(3)}`;
    }
    return priceStr; // Return as-is if length is different
  };

  return (
    <div className="w-full flex flex-col mb-4 border py-2 gap-3">
      <div className="flex col-span-5 mdl:col-span-2 items-start gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(deleteSaved(item.id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        {item.images?.length > 0 ? (
          <img
            className="w-32 h-32"
            src={item.images[0].image}
            alt="productImage"
          />
        ) : (
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        )}
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-titleFont font-semibold md:text-xl text-primeColor">
            {item.name}
          </h1>
          <p>
            <b className="text-primeColor">Цена:</b> {formatPrice(item.price)} сумов
          </p>
        </div>
      </div>
      <Button
        className="rounded-none w-[97%] mx-auto"
        onClick={() => {
          dispatch(
            addToCart({
              id: item.id,
              description: item.description,
              name: item.name,
              quantity: 1,
              images: item.images,
              slug: item.slug,
              price: item.price,
              colors: item.color,
              category: item.category,
            })
          );
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default SavedItem;
