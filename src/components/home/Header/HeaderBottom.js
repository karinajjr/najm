import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/orebiSlice";

const HeaderBottom = () => {
  const { saved, categories, products } = useSelector(
    (state) => state.orebiReducer
  ); 
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const searchInputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      // Ensure ref.current exists before calling contains
      if (ref.current && ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [ref]); // No need to depend on 'show' here

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

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

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleFocusSearchInput = () => {
      focusSearchInput(); // Call the focus method
    };

    window.addEventListener('focusSearchInput', handleFocusSearchInput);

    return () => {
      window.removeEventListener('focusSearchInput', handleFocusSearchInput);
    };
  }, []); // Empty dependency array to run only once

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full py-8 h-full lg:h-24">
          {/* Search bar */}
          <div className="relative w-full mx-auto lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              ref={searchInputRef}
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Поиск"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer flex flex-col gap-2`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(`/product/${item.id}`, {
                          state: {
                            item: item,
                          },
                        }) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={item.id}
                      className="max-w-[650px] h-auto p-2 flex items-start gap-4"
                    >
                      <div className="w-[100px] h-[100px]">
                        <img
                          className="w-[100px] max-h-[100px] object-contain object-center"
                          src={item.images[0].image}
                          alt="productImg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-small text-lg">{item.name}</p>
                        <p className="text-sm">
                          Цена:{" "}
                          <span className="text-primeColor font-small">
                            {formatPrice(item.price)} сумов
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
