import { cn } from '@flowerchild/lib/utils';
import { OrderSummary } from './order-summary';
import { CartItemsSummary } from './cart-items-summary';
import { cookies } from 'next/headers';
import { getServerSideUser } from '@flowerchild/lib/payload-utils';

const Page = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className='bg-white'>
      <div
        className={cn(
          'mx-auto max-w-2xl px-4 pb-24 pt-16',
          'sm:px-6',
          'lg:max-w-7xl lg:px-8',
        )}
      >
        <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Bag
        </h1>

        <div
          className={cn(
            'mt-12',
            'lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12',
            'xl:gap-x-16',
          )}
        >
          <CartItemsSummary />

          <OrderSummary user={user} />
        </div>
      </div>
    </div>
  );
};

export default Page;
