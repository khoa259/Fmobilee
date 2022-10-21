import React from "react";
import styles from "./banner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

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
          <img
            src="https://fptshop.com.vn/Uploads/Originals/2022/9/19/637991957822826217_190922_ip14-01.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://fptshop.com.vn/Uploads/Originals/2022/9/19/637991958399093314_190922_ip14-02.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://fptshop.com.vn/Uploads/Originals/2022/9/19/637991957822826217_190922_ip14-01.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
