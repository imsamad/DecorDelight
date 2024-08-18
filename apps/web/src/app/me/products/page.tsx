import { requireAuth } from "@/lib/requireAuth";

const ProductList = async () => {
  const session = await requireAuth("/products");

  return <div>ProductList</div>;
};

export default ProductList;
