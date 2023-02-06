import React from "react";
import styles from "./banner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Pagination, Autoplay } from "swiper";

const Banner = () => {
  return (
    <div>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className={styles.mySwiper}>
        <SwiperSlide>
          <Link to="/category/macbook">
            <img
              src="https://fptshop.com.vn/Uploads/Originals/2023/1/3/638083549031008481_z4009802149387_2a9ff9b9d59471214f4801c74a85bf26.jpg"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/iphone">
            <img
              src="https://fptshop.com.vn/Uploads/Originals/2022/9/19/637991957822826217_190922_ip14-01.png"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category/apple-watch">
            <img
              src="https://fptshop.com.vn/Uploads/Originals/2022/10/28/638025767322802345_z3836605566486_e7c58a90ff09cd8c90267afd7b33460e.jpg"
              alt=""
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
