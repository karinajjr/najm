import React, { useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useDispatch, useSelector } from "react-redux";
import { getBestSellers } from "../../../redux/orebiSlice";

const BestSellers = () => {
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getBestSellers());
  }, [dispatch]);

  const bestSellers = useSelector((state) => state.orebiReducer.bestSellers);

  return (
    <div className="w-full pb-20">
      <Heading heading="Бестселлеры " className="text-base font-body" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {bestSellers.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            images={product.images}
            product_name={product.name}
            price={product.price}
            description={product.description}
            slug={product.slug}
            in_stock={product.in_stock}
            is_recommended={product.is_recommended}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
