import { prismaClient } from "@repo/db";
import { ProductList } from "./ProductList";
import { PageWrapper } from "@/components/PageWrapper";

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({
    where: { status: "PUBLISHED" },
    select: {
      title: true,
      medias: true,
      description: true,
      quantityInStock: true,
      id: true,
      slug: true,
      price: true,
    },
  });

  return (
    <PageWrapper>
      <p className="italic text-center text-xl font-bold">Our collections</p>
      <ProductList products={products} />
    </PageWrapper>
  );
};

export default ProductsPage;
