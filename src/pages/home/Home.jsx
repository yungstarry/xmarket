import { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import { Product } from "../../components/product";

const Home = () => {
  const url = window.location.href;


  useEffect(() => {
      const scrollToProducts = () => {
        if (url.includes("#products")) {
          window.scrollTo({
            top: 600,
            behavior: "smooth",
          });
          return;
        }
      };
   scrollToProducts()
  }, [url])
  

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
