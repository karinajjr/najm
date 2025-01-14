import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToSaved } from "../../../redux/orebiSlice";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { useToast } from "../../ui/use-toast";
import { ToastAction } from "../../ui/toast";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [defaultColor, setDefaultColor] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    if (productInfo && productInfo.images && productInfo.images.length === 1) {
      setDefaultColor(productInfo.images[0].id); // Set the first image's id as default
    }
  }, [productInfo]);

  const handleSave = () => {
    if (!defaultColor) {
      toast({
        variant: "destructive",
        title: "Пожалуйста, выберите цвет перед сохранением.",
        action: <ToastAction altText="Try again">Повторить</ToastAction>,
      });
      return;
    }
    dispatch(
      addToSaved({
        id: productInfo.id,
        name: productInfo.product_name,
        quantity: 1,
        images: productInfo.images,
        badge: productInfo.badge,
        price: productInfo.price,
        color: defaultColor,
      })
    );
  };

  const handleAddToCart = () => {
    if (!defaultColor) {
      toast({
        variant: "destructive",
        title: "Пожалуйста, выберите цвет перед добавлением в корзину.",
        action: <ToastAction altText="Try again">Повторить</ToastAction>,
      });
      return;
    }
    dispatch(
      addToCart({
        id: productInfo.id,
        name: productInfo.product_name,
        quantity: 1,
        images: productInfo.images,
        badge: productInfo.badge,
        price: productInfo.price,
        color: defaultColor,
      })
    );
  };

  if (!productInfo || !productInfo.images) {
    return (
      <div className="space-y-2 w-full h-full text-center">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
      </div>
    );
  }

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
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-3xl md:text-4xl font-semibold">
        {productInfo.product_name}
      </h2>
      <p className="text-xl font-small">
        {formatPrice(productInfo.price)} сумов
      </p>
      <p className="text-base text-gray-600">
        <b>Описание: </b>
        {productInfo.description}
      </p>

      <div className="font-medium text-lg flex flex-col items-start gap-4">
        <span className="font-normal">Цвета:</span>
        <div className="flex items-center flex-wrap gap-2">
          {productInfo.images.map((img) => (
            <Card
              key={img.id}
              className={`w-[100px] h-[100px] cursor-pointer ${
                img.id === defaultColor ? "border-primeColor" : ""
              }`}
              onClick={() => setDefaultColor(img.id)}
            >
              <CardContent className="w-full flex aspect-square items-center justify-center p-2">
                {/* Ensuring the image is contained properly */}
                <img
                  className="w-full h-full object-contain object-center"
                  src={img.image}
                  alt="product thumbnail"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-4 bg-white border hover:bg-primeColor hover:text-white duration-300 text-black text-lg font-titleFont"
      >
        Сохранить
      </button>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Добавить в корзину
      </button>

      <p className="font-normal text-sm">
        <span className="text-base font-medium">Категории:</span>{" "}
        {productInfo.category.name}
      </p>
    </div>
  );
};

export default ProductInfo;
