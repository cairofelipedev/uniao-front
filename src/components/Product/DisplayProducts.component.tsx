/*eslint complexity: ["error", 20]*/
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { filteredVariantPrice, paddedPrice } from '@/utils/functions/functions';

import Slider from "react-slick";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";


interface Image {
  __typename: string;
  sourceUrl?: string;
}

interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

interface Variations {
  __typename: string;
  nodes: Node[];
}

interface RootObject {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  image: Image;
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations: Variations;
}

interface IDisplayProductsProps {
  products: RootObject[];
}

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @function DisplayProducts
 * @param {IDisplayProductsProps} products Products to render
 * @returns {JSX.Element} - Rendered component
 */

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        className: "center",
        arrows: false,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function CustomNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <TfiArrowCircleRight
      className={className}
      style={{ ...style, display: "block", color: "green" }}
      onClick={(onClick as unknown) as React.MouseEventHandler<SVGElement>}
    />
  );
}

function CustomPrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <TfiArrowCircleLeft
      className={className}
      style={{ ...style, display: "block", color: "green" }}
      onClick={(onClick as unknown) as React.MouseEventHandler<SVGElement>}
    />
  );
}

const DisplayProducts = ({ products }: IDisplayProductsProps) => (
  <section className="mx-auto max-w-screen-xl">
    <div id="product-container">
      <Slider {...settings}>
        {products ? (
          products.map(
            ({
              databaseId,
              name,
              price,
              regularPrice,
              salePrice,
              onSale,
              slug,
              image,
              variations,
            }) => {
              // Add padding/empty character after currency symbol here
              if (price) {
                price = paddedPrice(price, 'R$');
              }
              if (regularPrice) {
                regularPrice = paddedPrice(regularPrice, 'R$');
              }
              if (salePrice) {
                salePrice = paddedPrice(salePrice, 'R$');
              }

              return (
                <div
                  key={uuidv4()}
                  className="flex flex-col lg:p-4 p-1"
                >

                  <div className="mx-auto mt-10 w-full transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                    <span>
                      {image ? (
                        <img
                          id="product-image"
                          className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105 h-72 w-full"
                          alt={name}
                          src={image.sourceUrl}
                        />
                      ) : (
                        <img
                          id="product-image"
                          className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105 h-40 w-full"
                          alt={name}
                          src={
                            process.env.NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL
                          }
                        />
                      )}
                    </span>
                    <Link
                      href={`/produto/${encodeURIComponent(
                        slug,
                      )}?id=${encodeURIComponent(databaseId)}`}
                    >
                      <div className="p-4">
                        <h2 className="mb-2 text-lg font-medium  text-gray-900">{name}</h2>
                        {onSale && (
                          <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold text-gray-900">
                              {variations && filteredVariantPrice(price, '')}
                              {!variations && salePrice}
                            </p>
                            <p className="text-base  font-medium text-gray-500 line-through">
                              {variations && filteredVariantPrice(price, 'right')}
                              {!variations && regularPrice}
                            </p>
                            {/* <p className="ml-auto text-base font-medium text-green-500">20% off</p> */}
                          </div>
                        )}
                        {/* Display regular price when not on sale */}
                        {!onSale && (
                          <p className="pt-1 text-center text-gray-900">{price}</p>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              );
            },
          )
        ) : (
          <div className="mx-auto text-xl font-bold text-center text-gray-800 no-underline uppercase">
            Produto sem Imagem
          </div>
        )}
      </Slider>
    </div >
  </section >
);

export default DisplayProducts;
