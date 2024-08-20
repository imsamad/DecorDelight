'use client';
import { ShoppingCart, ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className='bg-gray-100'>
      {/* Hero Section */}
      <header className="relative h-screen bg-[url('/images/antique-hero.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className='bg-black bg-opacity-50 p-8 rounded-lg text-center text-white'>
          <h1 className='text-5xl font-bold mb-4'>
            Discover Timeless Antiques
          </h1>
          <p className='text-lg mb-6'>
            Handpicked pieces from around the world, adding history and elegance
            to your home.
          </p>
          <Button variant='default' size='lg' className='flex items-center'>
            Shop Now
            <ArrowRightCircle className='ml-2 w-5 h-5' />
          </Button>
        </div>
      </header>

      {/* Featured Collection Section */}
      <section className='py-16'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-semibold mb-8'>Featured Collection</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <Image
                src='/images/antique1.jpg'
                alt='Antique 1'
                width={400}
                height={300}
                className='rounded-md mb-4'
              />
              <h3 className='text-2xl font-semibold mb-2'>Victorian Lamp</h3>
              <p className='text-gray-600 mb-4'>
                A beautifully preserved Victorian-era lamp with intricate
                detailing.
              </p>
              <Button
                variant='default'
                size='sm'
                className='flex items-center justify-center w-full'
              >
                Add to Cart
                <ShoppingCart className='ml-2 w-5 h-5' />
              </Button>
            </div>

            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <Image
                src='/images/antique2.jpg'
                alt='Antique 2'
                width={400}
                height={300}
                className='rounded-md mb-4'
              />
              <h3 className='text-2xl font-semibold mb-2'>Antique Clock</h3>
              <p className='text-gray-600 mb-4'>
                An ornate clock from the early 19th century, still in perfect
                working order.
              </p>
              <Button
                variant='default'
                size='sm'
                className='flex items-center justify-center w-full'
              >
                Add to Cart
                <ShoppingCart className='ml-2 w-5 h-5' />
              </Button>
            </div>

            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <Image
                src='/images/antique3.jpg'
                alt='Antique 3'
                width={400}
                height={300}
                className='rounded-md mb-4'
              />
              <h3 className='text-2xl font-semibold mb-2'>Vintage Vase</h3>
              <p className='text-gray-600 mb-4'>
                A rare vintage vase, perfect for adding a touch of history to
                your decor.
              </p>
              <Button
                variant='default'
                size='sm'
                className='flex items-center justify-center w-full'
              >
                Add to Cart
                <ShoppingCart className='ml-2 w-5 h-5' />
              </Button>
            </div>
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
          <div className='md:w-1/2 mt-8 md:mt-0'>
            <Image
              src='/images/about-us.jpg'
              alt='About Us'
              width={600}
              height={400}
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

      {/* Footer Section */}
      <footer className='bg-black text-white py-8'>
        <div className='container mx-auto text-center'>
          <p>
            &copy; {new Date().getFullYear()} Your Antiques Store. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
