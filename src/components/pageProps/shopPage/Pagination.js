import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import useQuery from "../../../hooks/useQuery";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              category={item.category}
              id={item.id}
              images={item.images}
              product_name={item.name}
              price={item.price}
              description={item.description}
              in_stock={item.in_stock}
              is_recommended={item.is_recommended}
              slug={item.slug}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, conf }) => {
  const id = useQuery("category");
  const state = useSelector((state) => state.orebiReducer);
  const [finalProducts, setFinalProducts] = useState(state[conf]);
  const [itemOffset, setItemOffset] = useState(0);

  // Filter products based on selected category
  useEffect(() => {
    if (id) {
      const filteredProducts = state[conf].filter(
        (product) => product.category.id.toString() === id.toString()
      );
      setFinalProducts(filteredProducts);
    } else {
      setFinalProducts(state[conf]); // Reset to all products if no category is selected
    }
    // Reset pagination offset when the product list changes
    setItemOffset(0);
  }, [id, conf, state]);

  // Calculate current items for pagination
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = finalProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(finalProducts.length / itemsPerPage);

  // Handle page changes
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % finalProducts.length;
    setItemOffset(newOffset);
  };

  // Handle empty or loading state
  if (!finalProducts) {
    return <p className="font-body">Загрузка товаров....</p>;
  }

  if (finalProducts.length === 0) {
    return <p className="font-body">Товары не найдены.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemOffset + 1} to{" "}
          {endOffset > finalProducts.length ? finalProducts.length : endOffset}{" "}
          of {finalProducts.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
