import { requireAdmin } from "@/lib/requireAuth";
import ProductForm from "../ProductForm";
import { PageWrapper } from "@/components/PageWrapper";

const ProductCreate = async () => {
  await requireAdmin("/me/products/create");

  return (
    <PageWrapper>
      {/* <div className='container max-w-lg rounded-lg border-2 border-gray-700 my-8 p-0'> */}
      <ProductForm />
      {/* </div> */}
    </PageWrapper>
  );
};

export default ProductCreate;
