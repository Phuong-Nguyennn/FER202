import { Carousel } from "react-bootstrap";

export default function CarouselHome() {
  const images = [
    "/images/carousel/banner1.jpg",
    "/images/carousel/banner2.jpg",
    "/images/carousel/banner3.jpg"
  ];
  return (
    <Carousel>
      {images.map((img, i) => (
        <Carousel.Item key={i}>
          <img src={img} className="d-block w-100" alt="banner" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
