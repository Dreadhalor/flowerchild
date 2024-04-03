'use client';

import { NavigationMenuItem } from '@flowerchild/components/ui/navigation-menu';
import { NavItem } from './nav-item';

export const NavItems = () => {
  const categoryNamesToDisplay = ['Dresses', 'Tops', 'Bottoms'];

  return (
    <>
      {categoryNamesToDisplay.map((categoryLabel) => (
        <NavigationMenuItem
          key={categoryLabel}
          value={categoryLabel}
          className='h-full'
        >
          <NavItem categoryLabel={categoryLabel} />
        </NavigationMenuItem>
      ))}
    </>
  );
};
