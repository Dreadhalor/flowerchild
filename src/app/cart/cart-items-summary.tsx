'use client';

import React from 'react';
import { EmptyBag } from './empty-bag';
import { cn } from '@flowerchild/lib/utils';
import { useCart } from '@flowerchild/hooks/use-cart';
import { CartItem } from './cart-item';

export const CartItemsSummary = () => {
  const { items } = useCart();

  return (
    <div
      className={cn(
        'lg:col-span-7',
        items.length === 0 &&
          'rounded-lg border-2 border-dashed border-zinc-200 p-12',
      )}
    >
      <h2 className='sr-only'>Items in your shopping cart</h2>

      {items.length === 0 && <EmptyBag />}

      <ul
        className={cn(
          items.length > 0 &&
            'divide-y divide-gray-200 border-y border-gray-200',
        )}
      >
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
