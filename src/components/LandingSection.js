import React from "react";
import { Link } from "react-router-dom";

import "./styles/LandingSection.css";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

//images and videos
import footballVideo from "../assets/videos/football10.mp4";
import {
  footballCollection,
  sportsData,
  popularItems,
} from "../data/sportsData";

function LandingSection() {
  return (
    <div>
      <div className="title-container">
        <h5 className="title-small">Keep Playing</h5>
        <h1 className="title-big">The pitch is yours.</h1>
        <div className="title-button-container">
          <Link
            to={`/shop/${`Football`.toLowerCase()}`}
            className="title-button"
          >
            Shop
          </Link>
        </div>
      </div>
      <Link to={`/shop/${`Football`.toLowerCase()}`}>
        <video autoPlay loop muted className="video-player">
          <source src={footballVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Link>
      <div className="football-container">
        <Swiper
          slidesPerView={5}
          slidesPerGroup={1}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation, Scrollbar]}
          className="mySwiper"
        >
          {footballCollection.map((sport, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/shop/${sport.title.toLowerCase()}`}
                className="football-link"
              >
                <img
                  src={sport.image}
                  alt={sport.title}
                  className="football-image"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="sport-container">
        <h2 className="section-titles">Shop By Sport</h2>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={1}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation, Scrollbar]}
          className="mySwiper"
        >
          {sportsData.map((sport, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/shop/${sport.title.toLowerCase()}`}
                className="sport-link"
              >
                <img
                  src={sport.image}
                  alt={sport.title}
                  className="sport-image"
                />
                <h2 className="sport-heading">{sport.title}</h2>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <h2 className="section-titles">Popular Right Now</h2>
        <div className="popular-container">
          {popularItems.map((item, index) => (
            <div key={index} className="popular-item">
              <Link to={`/shop/${item.title.toLowerCase()}`}>
                <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingSection;
