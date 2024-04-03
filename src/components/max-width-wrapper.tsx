import { cn } from '@flowerchild/lib/utils';
import React from 'react';

type Props = {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
};
export const MaxWidthWrapper = ({
  className,
  innerClassName,
  children,
}: Props) => {
  return (
    <div className={cn('h-full w-full', className)}>
      <div
        className={cn(
          'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};
