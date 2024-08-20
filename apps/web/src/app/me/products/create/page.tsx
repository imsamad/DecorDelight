import { requireAdmin } from '@/lib/requireAuth';
import ProductForm from '../ProductForm';

const ProductCreate = async () => {
  await requireAdmin('/me/products/create');

  return (
    <div className='container max-w-lg rounded-lg border-2 border-gray-700 my-8 p-0'>
      <ProductForm />
    </div>
  );
};

export default ProductCreate;
