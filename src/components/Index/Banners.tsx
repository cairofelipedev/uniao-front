import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";


export default class HomeBanners extends Component {
  render() {
    const settings = {

      centerMode: true,
      centerPadding: "160px",
      slidesToShow: 1,
      speed: 500,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <>
        <div className="lg:mx-20 pt-6">
          <Slider {...settings}>
            <div className="px-3">
              <Image src="/images/banner.webp" alt="Vercel Logo" width={1920} height={640} layout="responsive" className="rounded-xl border-2" />
            </div>
            <div className="px-3">
              <Image src="/images/banner.webp" alt="Vercel Logo" width={1920} height={640} layout="responsive" className="rounded-xl border-2" />
            </div>
            <div className="px-3">
              <Image src="/images/banner.webp" alt="Vercel Logo" width={1920} height={640} layout="responsive" className="rounded-xl border-2" />
            </div>
            <div className="px-3">
              <Image src="/images/banner.webp" alt="Vercel Logo" width={1920} height={640} layout="responsive" className="rounded-xl border-2" />
            </div>
          </Slider>
        </div>
      </>
    );
  }
}