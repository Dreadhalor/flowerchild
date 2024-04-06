'use client';

import { User } from '@flowerchild/payload-types';
import { Button } from '@flowerchild/components/ui/button';
import { TRANSACTION_FEE } from '@flowerchild/config';
import { useCart } from '@flowerchild/hooks/use-cart';
import { cn, formatPrice } from '@flowerchild/lib/utils';
import { trpc } from '@flowerchild/trpc/client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  user: User | null;
};
export const OrderSummary = ({ user }: Props) => {
  const { items } = useCart();
  const router = useRouter();
  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const cartTotal = items.reduce(
    (acc, { product: { price }, quantity }) => acc + price * quantity,
    0,
  );

  return (
    <section
      className={cn(
        'mt-16 rounded-lg bg-gray-100 px-4 py-6',
        'sm:p-6',
        'lg:col-span-5 lg:mt-0 lg:p-8',
      )}
    >
      <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-600'>Subtotal</p>
          <p className='text-sm font-medium text-gray-900'>
            {formatPrice(cartTotal)}
          </p>
        </div>

        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <span>Flat Transaction Fee</span>
          </div>
          <div className='text-sm font-medium text-gray-900'>
            {formatPrice(TRANSACTION_FEE)}
          </div>
        </div>

        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Order Total</div>
          <div className='text-base font-medium text-gray-900'>
            {formatPrice(cartTotal + TRANSACTION_FEE)}
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <Button
          disabled={items.length === 0 || isLoading || !user}
          className='w-full'
          size='lg'
          onClick={() =>
            createCheckoutSession({
              products: items.map(({ product, quantity }) => ({
                productId: product.id,
                quantity,
              })),
            })
          }
        >
          {isLoading && <Loader2 className='mr-1.5 h-4 w-4 animate-spin' />}
          {user ? 'Checkout' : 'Sign in to checkout!'}
        </Button>
      </div>
    </section>
  );
};
