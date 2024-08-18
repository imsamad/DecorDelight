import { requireAuth } from "@/lib/requireAuth";
import ProductForm from "../ProductForm";

const ProductCreate = async () => {
  const session = await requireAuth("/products");

  return (
    <div className="container max-w-lg log">
      {" "}
      <ProductForm />
    </div>
  );
};

export default ProductCreate;
