import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { prismaClient } from '@repo/db';

const LandingPage = async () => {
  const products = await prismaClient.product.findMany({
    take: 3,
  });
  return (
    <div className='bg-gray-100'>
      {/* Hero Section */}

      <HeroSection />

      {/* Featured Collection Section */}
      <section className='py-16'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-semibold mb-8'>Featured Collection</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className='bg-white p-6 shadow-lg rounded-lg'>
                  <Image
                    src={product.medias[0].url}
                    alt='Antique 1'
                    width={400}
                    height={300}
                    className='rounded-md mb-4'
                  />
                  <h3 className='text-2xl font-semibold mb-2'>
                    {product.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{product.description}</p>
                  <Button size='sm' className='flex-1 hover:bg-gray-300 w-full'>
                    Buy Now
                  </Button>
                  {/* <Button
                  variant='default'
                  size='sm'
                  className='flex items-center justify-center w-full'
                >
                  Add to Cart
                  <ShoppingCart className='ml-2 w-5 h-5' />
                </Button> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 md:pr-8'>
            <h2 className='text-4xl font-semibold mb-4'>
              About Our Collection
            </h2>
            <p className='text-gray-600 mb-6'>
              Our collection is curated with a passion for history and art. Each
              piece is carefully selected for its authenticity, beauty, and
              historical significance. We bring you rare and unique antiques
              from different eras and regions, ensuring that each item tells a
              story of its own.
            </p>
            <Button variant='default' size='lg'>
              Learn More
            </Button>
          </div>
          <div className='md:w-1/2  flex justify-end mt-8 md:mt-0'>
            <Image
              src='/aboutUs.avif'
              alt='About Us'
              width={400}
              height={300}
              className='rounded-md'
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-semibold mb-8'>
            What Our Customers Say
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <p className='text-gray-600 mb-4'>
                "An incredible selection of antiques! The quality and
                authenticity are unmatched."
              </p>
              <h3 className='text-lg font-semibold'>John Doe</h3>
            </div>

            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <p className='text-gray-600 mb-4'>
                "I found the perfect piece for my collection. The customer
                service was fantastic."
              </p>
              <h3 className='text-lg font-semibold'>Jane Smith</h3>
            </div>

            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <p className='text-gray-600 mb-4'>
                "A truly exceptional experience. The antiques are beautiful and
                well-preserved."
              </p>
              <h3 className='text-lg font-semibold'>Emily Brown</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
export const HeroSection = () => {
  return (
    <div className='min-h-[100vh] md:min-h-[80vh] bg-[#222] pt-20 flex items-center bg-[url("/banner2.jpg")]'>
      <div className='container flex flex-col md:flex-row flex-wrap items-center'>
        <div className='flex-[4] mb-6 md:mb-0 rounded-md shadow-lg overflow-hidden order-1 md:order-2'>
          <Image
            src={'/banner2.jpg'}
            alt='banner2'
            width={600}
            height={500}
            className='w-full'
          />
        </div>

        <div className='flex-[6] md:pl-10  order-2 md:order-1 '>
          <div className='text-white pr-4 space-y-3 backdrop-blur-md  text-sm md:text-xl font-bold   text-justify'>
            Experience the Future of Shopping – Dive into a Curated Collection
            of Premium Products, Exclusive Deals, and Unmatched Quality.
            Redefine Your Style, Elevate Your Life – All in One Place!
          </div>
          <Link href='/products'>
            <Button className='mt-6'>Shop Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const HeroSection1 = () => {
  return (
    <div className='min-h-[80vh] bg-[#222] pt-20 flex items-center bg-[url("/banner2.jpg")]'>
      <div className='container   flex flex-wrap items-center'>
        <div className='flex-[6]'>
          <div className='  text-white space-y-3 backdrop-blur-md text-xl font-bold pr-10 text-justify'>
            Experience the Future of Shopping – Dive into a Curated Collection
            of Premium Products, Exclusive Deals, and Unmatched Quality.
            Redefine Your Style, Elevate Your Life – All in One Place!
          </div>
          <Link href='/products'>
            <Button className='mt-6'>Shop Now</Button>
          </Link>
        </div>

        <div className='flex-[4] rounded-md shadow-lg overflow-hidden'>
          <Image src={'/banner2.jpg'} alt='banner2' width={600} height={500} />
        </div>
      </div>
    </div>
  );
};
