import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./styles.css";
import styles from "./index.module.css";
import { useGeoData } from "../../context/parks-context.js";

SwiperCore.use([Pagination, Navigation]);

function Carousel() {
  const { data, activePointIndex, setActivePointIndex } = useGeoData();

  function onSlideChange(event) {
    setActivePointIndex(() => event.activeIndex);
  }

  console.log(activePointIndex);
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        className="mySwiper"
        onSlideChange={onSlideChange}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.parkPoints.map((point) => (
          <SwiperSlide>
            <p className={styles.imageContainer}>
              <img alt={point.citybug} src={`./assets/${point.citybug}.jpg`} />
              <span>
                <b>Адрес:</b> {point.address}
              </span>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Carousel;
