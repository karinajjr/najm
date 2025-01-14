import React, { useEffect, useState } from "react";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToSaved } from "../../../redux/orebiSlice";
import { Button, buttonVariants } from "../../ui/button";
import { shoppingCart, star } from "../../../assets/images";
import { Card } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Local state to handle loading status
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (props.id) {
      setIsLoading(false);
    }
  }, [props]);

  // Function to format product ID
  const idString = (id) => String(id).toLowerCase().split(" ").join("");
  const rootId = idString(props.id);

  // Handle product detail navigation
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: { item: props },
    });
  };

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
    <>
      <Card
        className="w-full relative py-2 p-0 hover:shadow-xl"
        onClick={handleProductDetails}
        {...props}
      >
        {isLoading ? (
          <div className="container w-full mx-auto my-5 border-b-gray-300 flex flex-col space-y-3">
            <Skeleton className="h-80 w-full" />
            <div className="space-y-2 w-full h-full text-center">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        ) : (
          <>
            <div className="pt-3 h-60 flex justify-center overflow-hidden">
              {props.images?.length > 0 ? (
                <img
                  className="max-w-80 max-h-60 mx-auto my-auto"
                  src={props.images[0].image}
                  alt="najm product"
                />
              ) : (
                <Skeleton className="max-w-80 max-h-60 mx-auto my-auto" />
              )}
            </div>
            <div className="p-4">
              <div className="font-titleFont pb-4">
                <h2 className="text-lg text-primeColor font-body line-clamp-2">
                  {props.product_name}
                </h2>
                <p className="text-[#767676] text-[14px] font-body mt-2">
                  {formatPrice(props.price)} сумов
                </p>
              </div>
              <Button
                className={`${buttonVariants({
                  variant: "outline",
                  size: "default",
                })} text-primeColor rounded-none w-full`}
              >
                Перейти
              </Button>
              <div className="py-2 absolute top-[3%] right-[5%]">
                <ul className="flex flex-col items-end justify-center gap-4 font-titleFont">
                  <li
                    onClick={() => {
                      dispatch(
                        addToCart({
                          id: props.id,
                          images: props.images,
                          name: props.name,
                          description: props.description,
                          price: props.price,
                          slug: props.slug,
                          inStock: props.inStock,
                          quantity: 1,
                          isRecommended: props.isRecommended,
                          category: props.category,
                        })
                      );
                    }}
                    className="gap-2 hover:cursor-pointer duration-300 p-2 rounded-full border border-black-600 hover:border-primeColor hover:bg-primeColor"
                  >
                    <Image
                      imgSrc={shoppingCart}
                      alt="cart"
                      className="w-[20px] h-[20px]"
                    />
                  </li>
                  <li
                    onClick={() => {
                      dispatch(
                        addToSaved({
                          id: props.id,
                          images: props.images,
                          name: props.product_name,
                          description: props.description,
                          price: props.price,
                          slug: props.slug,
                          inStock: props.inStock,
                          quantity: 1,
                          isRecommended: props.isRecommended,
                          category: props.category,
                        })
                      );
                    }}
                    className="gap-2 hover:cursor-pointer duration-300 p-2 rounded-full border border-black-600 hover:border-primeColor hover:bg-primeColor"
                  >
                    <Image
                      imgSrc={star}
                      alt="star"
                      className="w-[20px] h-[20px]"
                    />
                  </li>
                </ul>
              </div>
              <div className="absolute top-6 left-8">
                {props.badge && <Badge text="New" />}
              </div>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default Product;
