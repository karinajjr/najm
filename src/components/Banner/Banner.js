import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { heroBg, heroBg1 } from "../../assets/images";
import Image from "../designLayouts/Image";

// Extract styles to constants
const DOT_ACTIVE_STYLE = {
  width: "30px",
  color: "#262626",
  borderRight: "3px #262626 solid",
  padding: "8px 0",
  cursor: "pointer",
};

const DOT_INACTIVE_STYLE = {
  width: "30px",
  color: "transparent",
  borderRight: "3px white solid",
  padding: "8px 0",
  cursor: "pointer",
};

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);

  // Memoize settings
  const settings = React.useMemo(
    () => ({
      dots: false,
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (prev, next) => setDocActive(next),
      appendDots: (dots) => (
        <div className="top-1/2 left-[7%] transform -translate-y-1/2 absolute">
          <ul className="m-0 relative"> {dots} </ul>
        </div>
      ),
      customPaging: (i) => (
        <div style={i === dotActive ? DOT_ACTIVE_STYLE : DOT_INACTIVE_STYLE}>
          0{i + 1}
        </div>
      ),
      responsive: [
        {
          breakpoint: 576,
          settings: {
            dots: true,
            appendDots: (dots) => (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  transform: "translateY(-50%)",
                }}
              >
                <ul style={{ margin: "0px" }}> {dots} </ul>
              </div>
            ),
            customPaging: (i) => (
              <div
                style={
                  i === dotActive
                    ? {
                        width: "25px",
                        color: "#262626",
                        borderRight: "3px #262626 solid",
                        cursor: "pointer",
                        fontSize: "12px",
                      }
                    : {
                        width: "25px",
                        color: "transparent",
                        borderRight: "3px white solid",
                        cursor: "pointer",
                        fontSize: "12px",
                      }
                }
              >
                0{i + 1}
              </div>
            ),
          },
        },
      ],
    }),
    [dotActive]
  );

  const slides = [
    { imgSrc: heroBg, link: "/offer" },
    { imgSrc: heroBg1, link: "/offer" },
  ];

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Link key={index} to={slide.link}>
            <div>
              <Image imgSrc={slide.imgSrc} className="bg-contain" />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
