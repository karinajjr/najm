import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "../../designLayouts/Image";
import {
  homeIcon,
  star,
  profileCircle,
  shoppingCart,
  hamburgerIcon,
  search,
} from "../../../assets/images";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/dialog";
import useQuery from "../../../hooks/useQuery";

export default function FooterNav() {
  const categories = useSelector((state) => state.orebiReducer.categories);
  const selectedCategoryId = useQuery("category");
  const isCategorySelected = (id) => selectedCategoryId === id.toString();
  const location = useLocation();

  return (
    <div className="w-[99%] md:hidden mx-auto fixed bottom-0 right-0 left-0 bg-white rounded-t-lg z-50">
      <div className="flex items-center justify-around p-3">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            location.pathname === "/" ? "border-b-2 border-primeColor pb-1" : ""
          }`}
        >
          <Image imgSrc={hamburgerIcon} className="w-[23px] h-[23px]" />
          <p className="text-[11px]">Меню</p>
        </Link>

        <Link
          to="/saved"
          className={`flex flex-col items-center ${
            location.pathname === "/saved" ? "border-b-2 border-primeColor pb-1" : ""
          }`}
        >
          <Image imgSrc={star} className="w-[23px] h-[23px]" />
          <p className="text-[11px]">Избранное</p>
        </Link>

        <Link
          to="/signin"
          className={`flex flex-col items-center ${
            location.pathname === "/signin" ? "border-b-2 border-primeColor pb-1" : ""
          }`}
        >
          <Image imgSrc={profileCircle} className="w-[23px] h-[23px]" />
          <p className="text-[11px]">Профиль</p>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center ${
            location.pathname === "/shop" ? "border-b-2 border-primeColor pb-1" : ""
          }`}
        >
          <Image imgSrc={shoppingCart} className="w-[23px] h-[23px]" />
          <p className="text-[11px]">Корзина</p>
        </Link>

        <Link
          to="/search"
          className={`flex flex-col items-center ${
            location.pathname === "/search" ? "border-b-2 border-primeColor pb-1" : ""
          }`}
        >
          <Image imgSrc={search} className="w-[21px] h-[21px]" />
          <p className="text-[11px]">Поиск</p>
        </Link>
      </div>
    </div>
  );
}
