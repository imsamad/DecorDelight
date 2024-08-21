import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@repo/db";
import Image from "next/image";

export function ProductCarousel({ medias }: { medias: Product["medias"] }) {
  return (
    <Carousel className="w-full max-w-md log">
      <CarouselContent>
        {medias.map((media) => (
          <CarouselItem key={media.url}>
            <div className="p-0 rounded-xl overflow-hidden shadow-md">
              {/* <Card> */}
              {/* <CardContent className='flex aspect-square items-center justify-center p-6'> */}
              {/* <span className='text-4xl font-semibold'>{index + 1}</span> */}
              <Image
                src={media.url}
                height={400}
                width={500}
                className="object-cover "
                alt={media.url}
              />
              {/* </CardContent> */}
              {/* </Card> */}
            </div>
          </CarouselItem>
        ))}
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='text-4xl font-semibold'>{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
