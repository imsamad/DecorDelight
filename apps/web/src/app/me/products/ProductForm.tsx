'use client';
import { FormFieldWrapper } from '@/components/FormFieldWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EMediaEnum,
  ProductSchema,
  TProductSchema,
  TObjectIdFormatSchema,
} from '@repo/utils';
import { useFieldArray, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { fetcher } from '@/lib/fetcher';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const ProductForm = ({
  product,
  productId: productIdProp = '',
}: {
  product?: TProductSchema;
  productId?: TObjectIdFormatSchema;
}) => {
  const router = useRouter();
  const [productId, setProductId] = useState(productIdProp);
  const { toast } = useToast();

  const productForm = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),

    values: product ? product : undefined,
  });

  const mediaFiels = useFieldArray({
    control: productForm.control,
    name: 'medias',
  });

  const imageContainerRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Step 2: Access the DOM element and get its dimensions
    const updateDimensions = () => {
      if (imageContainerRef.current) {
        const { width, height } =
          imageContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Measure on mount
    updateDimensions();

    // Step 3: (Optional) Re-measure on window resize or other dependencies
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/mkv',
      ];

      const file = e.target.files?.[0];

      if (!file || !allowedTypes.includes(file.type)) return;

      const formData = new FormData();
      formData.append('asset', file);

      const res = await fetcher(`/assets`, 'POST', formData);

      let mediaType: EMediaEnum;
      if (file.type.startsWith('image/')) {
        mediaType = EMediaEnum.IMAGE;
      } else {
        mediaType = EMediaEnum.VIDEO;
      }

      const medias = productForm.getValues('medias');

      const media = {
        url: res.url,
        type: mediaType,
        isDefault: false,
        orderNo: medias?.length ? medias.length + 1 : 1,
      };

      productForm.setValue('medias', [
        ...(medias?.length ? medias : []),
        media,
      ]);
    } catch (error) {}
  };

  const handleProductSubmit = async (product: TProductSchema) => {
    let url = '/products/';
    if (productId) url += productId;

    const res = await fetcher(url, productId ? 'PUT' : 'POST', product);

    router.push(`/me/products/edit/${res.product.id}`);
  };

  return (
    <Form {...productForm}>
      <form
        className='m-4'
        onSubmit={productForm.handleSubmit(handleProductSubmit)}
      >
        <h3 className='text-center scroll-m-20 text-2xl font-semibold tracking-tight'>
          {productId ? `Edit Product` : `Create Product`}
        </h3>
        <div ref={imageContainerRef} className='w-full flex justify-center'>
          <Carousel
            className='w-full max-w-xs'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <CarouselContent>
              {productForm.getValues('medias')?.length ? (
                productForm.getValues('medias')?.map((media) => (
                  <CarouselItem key={media.url}>
                    <div className='p-1'>
                      <Card>
                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                          <Image
                            src={media.url}
                            alt='csdkn'
                            width={dimensions.width}
                            height={dimensions.height}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>
                          Add Media +
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <p className='text-sm font-medium text-destructive'>
          {productForm.formState.errors.medias?.message}
        </p>
        <div className='my-2'>
          <Input
            type='file'
            multiple={false}
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>
        <FormFieldWrapper.TextField
          control={productForm.control}
          name='title'
          label='Title'
        />
        <FormFieldWrapper.TextArea
          control={productForm.control}
          name='description'
          label='Description'
        />
        <FormFieldWrapper.TextField
          control={productForm.control}
          name='price.amount'
          label='Amount'
          type='number'
        />
        <FormFieldWrapper.TextField
          control={productForm.control}
          name='quantityInStock'
          label='Quantity present in stocks'
          type='number'
        />
        <div className='my-4'>
          <p className='inputLabel mt-2 text-lg'>Dimensions</p>
          <div className='flex gap-2'>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name='dimension.length'
                label='Length'
                type='number'
              />
            </div>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name='dimension.width'
                label='Width'
                type='number'
              />
            </div>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name='dimension.height'
                label='Height'
                type='number'
              />
            </div>
            <div>
              <FormFieldWrapper.TextField
                control={productForm.control}
                name='dimension.weight'
                label='Weight'
                type='number'
              />
            </div>
          </div>
        </div>
        <Button type='submit' disabled={productForm.formState.isSubmitting}>
          {productId ? 'Edit' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;

const TableProp = ({ setTableProps: setTablePropsProp }: any) => {
  const [tableProps, setTableProps] = useState([{ key: '', value: '' }]);
  const handleChange = ({
    index,
    value,
    isKey,
  }: {
    isKey: boolean;
    index: number;
    value: string;
  }) => {
    if (isKey) tableProps[index].key = value;
    else tableProps[index].value = value;
    let tmp = [...tableProps];
    setTableProps(tmp);
    setTablePropsProp(tmp);
  };

  return (
    <div>
      {tableProps.map((tableProp, index) => (
        <SingleTableProp key={index} />
      ))}
    </div>
  );
};

const SingleTableProp = () => {
  const [tableProp, setTableProp] = useState({ key: '', value: '' });
  return (
    <div className='flex gap-2'>
      <Input
        onChange={(e) => {
          setTableProp((p) => ({ key: e.target.value, value: p.value }));
        }}
      />
      <Input
        onChange={(e) =>
          setTableProp((p) => ({ value: e.target.value, key: p.key }))
        }
      />

      <Button>
        <Plus />
      </Button>

      <Button>
        <Trash />
      </Button>
    </div>
  );
};
