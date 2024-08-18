import { requireAuth } from "@/lib/requireAuth";

const ProductEditPage = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const session = await requireAuth(`/me/products/${productId}`);
  return <div>ProductEditPage</div>;
};

export default ProductEditPage;
