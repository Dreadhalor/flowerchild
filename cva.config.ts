import { defineConfig } from 'cva';
import { cn } from '@flowerchild/lib/utils';

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => cn(className),
  },
});
