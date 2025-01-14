import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (location.state && location.state.item) {
      const product = location.state.item;
      setProductInfo(product);
      setPrevLocation(location.pathname);
      if (product.images && product.images.length > 0) {
        setCurrentImage(product.images[0]);
      }
    }
  }, [location]);

  const images = productInfo?.images;

  const setImage = (id) => {
    if (images) {
      const selectedImage = images.find((image) => image.id === id);
      setCurrentImage(selectedImage);
    }
  };

  if (!productInfo) {
    return (
      <div className="container w-full mx-auto my-5 border-b-gray-300 flex flex-col space-y-3">
        <Skeleton className="h-80 w-full" />
        <div className="space-y-2 w-full h-full text-center">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
        </div>
      </div>
    ); // Fallback for when productInfo is not yet available
  }
  return (
    <div className="w-full my-5 mx-auto border-b-gray-300">
      <div className="mx-auto">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 xl:grid-rows-1 gap-4 h-full -mt-5 xl:-mt-8 bg-white">
          <div className="h-full w-[60%] mx-auto md:col-span-2 xl:col-span-3 flex flex-col gap-1 justify-center items-center">
            <div className="">
              {currentImage ? (
                <img
                  className="w-auto max-h-80 sml:w-[400px] sml:h-[400px] object-contain"
                  src={currentImage.image}
                  alt="product"
                />
              ) : (
                <div className="text-center">
                  <Skeleton className="w-auto max-h-80 sml:w-[400px] sml:h-[400px]" />
                  <p className="bg-yellow-600">Ничего не найдено!</p>
                </div>
              )}
            </div>
            {images.length > 1 ? (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="max-w-sm"
              >
                <CarouselContent>
                  {images?.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1 sm:basis-1/2 sml:basis-1/3"
                      onClick={() => setImage(image.id)}
                    >
                      <div>
                        <Card
                          className={`${
                            image.id === currentImage.id && "border-primeColor"
                          } h-[120px]`}
                        >
                          <CardContent className="w-full flex aspect-square items-center justify-center p-1">
                            <img
                              className="w-full object-contain object-center"
                              src={image.image}
                              alt="product thumbnail"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              ""
            )}
          </div>
          <div className="h-full w-full row-span-auto md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center p-4">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
