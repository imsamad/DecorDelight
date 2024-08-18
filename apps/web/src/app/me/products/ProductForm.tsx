"use client";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, TProductSchema } from "@repo/utils";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const ProductForm = () => {
  const productForm = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
  });

  return (
    <Form {...productForm}>
      <form onSubmit={productForm.handleSubmit(() => {})}>
        <FormFieldWrapper.TextField
          control={productForm.control}
          name="title"
          label="Title"
        />

        <FormFieldWrapper.TextArea
          control={productForm.control}
          name="description"
          label="Description"
        />

        <FormFieldWrapper.TextField
          control={productForm.control}
          name="price.amount"
          label="Amount"
          type="number"
        />

        <FormFieldWrapper.TextField
          control={productForm.control}
          name="quantityInStock"
          label="Quantity present in stocks"
          type="number"
        />

        <div>
          <p className="inputLabel mt-2">Dimension</p>
          <div className="flex gap-2">
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name="dimension.length"
                label="Length"
                type="number"
              />
            </div>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name="dimension.width"
                label="Width"
                type="number"
              />
            </div>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name="dimension.height"
                label="Height"
                type="number"
              />
            </div>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name="dimension.weight"
                label="Weight"
                type="number"
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
