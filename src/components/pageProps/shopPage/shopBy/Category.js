import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useQuery from "../../../../hooks/useQuery";
import NavTitle from "./NavTitle";

const Category = () => {
  const categories = useSelector((state) => state.orebiReducer.categories);
  const selectedCategoryId = useQuery("category");
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId.toString()) {
      // Navigate back to the /shop page if the same category is clicked
      navigate("/shop");
    } else {
      // Navigate to the selected category's page
      navigate(`/shop?category=${categoryId}`);
    }
  };

  return (
    <div className="w-full">
      <NavTitle title="Покупки по категориям" />
      <ul className="flex flex-col gap-4">
        {categories.map(({ id, name }) => {
          const isSelected = selectedCategoryId === id.toString();

          return (
            <li
              key={id}
              onClick={() => handleCategoryClick(id)}
              className={`${
                isSelected ? "font-body text-primeColor" : "text-[#767676]"
              } text-sm lg:text-base border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer`}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
