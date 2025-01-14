import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { MdClose } from "react-icons/md";
// import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import Flex from "../../designLayouts/Flex";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const navBarList = [
    {
      id: 1001,
      title: "Главная",
      link: "/",
    },
    {
      id: 1002,
      title: "Покупки",
      link: "/shop",
    },
    {
      id: 1003,
      title: "О нас",
      link: "/about",
    },
    {
      id: 1004,
      title: "Контакты",
      link: "contact",
    },
  ];

  const location = useLocation();
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="container h-full mx-auto relative">
        <Flex className="flex items-center justify-center md:justify-between h-full">
          {/* Logo */}
          <Link to="/">
            <div>
              <Image className="w-20 object-cover" imgSrc={logo} />
            </div>
          </Link>
          {/* Nav */}
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                <>
                  {navBarList.map(({ id, title, link }) => (
                    <NavLink
                      key={id}
                      className="flex font-normal hover:font-body w-[145px] h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </>
              </motion.ul>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
