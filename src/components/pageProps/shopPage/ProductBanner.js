import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const ProductBanner = ({ itemsPerPageFromBanner, confItem }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* =========================================================
                            Right Part STart here
        ======================================================== */}
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
        <Select onValueChange={(e) => confItem(e)} defaultValue="products">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Сортировать по:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="font-body" value="products">Все продукты</SelectItem>
              <SelectItem className="font-body" value="newArrivals">Новинкии</SelectItem>
              <SelectItem className="font-body" value="bestSellers">Бестселлары</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select 
          onValueChange={(e) => itemsPerPageFromBanner(+e)}
          defaultValue="12"
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Показывать:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="font-body" value="12">12</SelectItem>
              <SelectItem className="font-body" value="24">24</SelectItem>
              <SelectItem className="font-body" value="36">36</SelectItem>
              <SelectItem className="font-body" value="48">48</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* =========================================================
                            Right Part End here
        ======================================================== */}
    </div>
  );
};

export default ProductBanner;
