import styles from "./Carousel.module.css";
import { Carousel as AntCarousel } from "antd";
import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Carousel = () => {
  return (
    <AntCarousel autoplay className={styles["slider"]}>
      <LazyLoadImage src={carouselImage1} effect="blur" />
      <LazyLoadImage src={carouselImage2} effect="blur" />
      <LazyLoadImage src={carouselImage3} effect="blur" />
    </AntCarousel>
  );
};
