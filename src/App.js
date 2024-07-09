import "./styles.css";
import Slide from "./Slide";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import classNames from "classnames";

function App() {
  const options = {
    loop: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 2000,
    }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateCurrent = () => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  const handleDotClick = (index) => {
    if (!emblaApi) {
      return;
    }
    emblaApi.scrollTo(index);
    updateCurrent();
  };

  const [data, setData] = useState([1]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", (api, e) => {
        setSelectedIndex(api.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className="container">
      <div className="main">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {data.map((num) => {
                return (
                  <div key={num} className="embla__slide">
                    <Slide id={num} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {data.length > 1 && (
          <div className="circles">
            {data.map((slide, index) => {
              return (
                <div
                  key={index}
                  className={classNames("circle", {
                    ["circle__selected"]: selectedIndex === index,
                  })}
                  onClick={() => handleDotClick(index)}
                />
              );
            })}
          </div>
        )}
        <button
          className="button"
          onClick={() => {
            setData([...data, data.length + 1]);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
