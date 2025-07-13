import { useRef } from "react";
import { Outlet } from "react-router";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Image1 from "../../assets/img-1.jpg";

export default function AuthLayout() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="bg-muted">
      <div className="flex min-h-svh items-center justify-center gap-12 bg-muted p-6 md:p-10 lg:w-[95%] lg:mx-auto">
        <div className=" border-2 hidden lg:block lg:max-w-[37%] rounded-2xl overflow-clip">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {carouselItems.map((_, index) => (
                <CarouselItem key={index} className="relative">
                  <img src={_.imageUrl} className="w-full max-w-[1130px]" />
                  <div className="absolute bg-black w-full h-full top-0 opacity-30"></div>
                  <p className="absolute bottom-12 left-0 right-0 z-10 text-center text-4xl font-bold max-w-[80%] mx-auto capitalize text-white">
                    {_.text}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

const carouselItems = [
  {
    imageUrl: Image1,
    text: "Capturing Moments",
  },
  {
    imageUrl: Image1,
    text: "Creating Memories",
  },
  {
    imageUrl: Image1,
    text: "Capturing Moments Creating Memories",
  },
  {
    imageUrl: Image1,
    text: "Capturing Memories",
  },
  {
    imageUrl: Image1,
    text: "Creating Moments",
  },
];
