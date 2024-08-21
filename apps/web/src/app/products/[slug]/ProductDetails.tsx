import AddToCart from "@/app/AddToCart";
import { PageWrapper } from "@/components/PageWrapper";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ProductCarousel } from "./ProductCarousel";
import { Product } from "@repo/db";

export const ProductDetails = async ({ product }: { product: Product }) => {
  return (
    <div className="px-4 md:p-0">
      <div className="block md:flex flex-wrap shadow-none md:shadow-xl py-4 gap-4">
        <div className="flex-[5] grid place-items-center mb-6 md:mb-0 p-4">
          <ProductCarousel medias={product.medias} />
        </div>
        <div className="flex-[5] space-y-4 log p-4 pb-8">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <h3 className="text-xl font-semibold text-gray-700">
            {product.price.currency} {product.price.amount.toFixed(2)}
          </h3>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex-[0.5]">
              <AddToCart
                redirectToCart={true}
                productId={product.id}
                quantityInStock={product.quantityInStock}
              />
            </div>
            <div className="flex-[0.5]">
              <Badge
                variant={
                  product.quantityInStock > 0 ? "default" : "destructive"
                }
              >
                {product.quantityInStock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>
          <Table className="mx-auto w-full md:w-3/4">
            <TableHeader>
              <TableRow>
                <TableHead>Dimension</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Weight</TableCell>
                <TableCell>{product.dimension.weight} kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Length</TableCell>
                <TableCell>{product.dimension.length} cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Width</TableCell>
                <TableCell>{product.dimension.width} cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Height</TableCell>
                <TableCell>{product.dimension.height} cm</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
