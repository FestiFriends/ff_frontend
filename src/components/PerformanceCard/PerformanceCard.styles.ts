export const performanceCardStyles = {
  card: {
    base: 'border rounded-lg bg-white transition-shadow cursor-pointer relative',
    variant: {
      default: 'p-4 hover:shadow-lg',
      compact: 'p-3 hover:shadow-md',
      detailed: 'p-6 hover:shadow-xl',
    },
  },

  likeButton: {
    base: 'absolute z-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors',
    size: 'w-8 h-8',
    position: {
      default: 'right-3 top-3',
      compact: 'right-2 top-2',
    },
  },

  image: {
    container: 'relative overflow-hidden',
    fallback:
      'w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm',
    size: {
      vertical: 'aspect-[3/4] w-full mb-3 rounded',
      compact: 'h-16 w-12 rounded flex-shrink-0',
      default: 'h-32 w-24 rounded flex-shrink-0',
    },
  },

  title: {
    base: 'font-bold',
    size: {
      compact: 'text-sm font-semibold mb-1 truncate',
      default: 'text-lg mb-2',
      detailed: 'text-xl mb-2',
      verticalDefault: 'text-base',
      verticalDetailed: 'text-lg',
    },
  },

  status: {
    base: 'inline-block rounded px-2 py-1 mr-2',
    size: {
      compact: 'text-xs',
      default: 'text-sm',
    },
    state: {
      ended: 'bg-gray-100 text-gray-600',
      ongoing: 'bg-green-100 text-green-700',
      upcoming: 'bg-blue-100 text-blue-700',
    },
  },

  info: {
    container: 'space-y-1 text-gray-600',
    size: {
      compact: 'text-xs',
      default: 'text-sm',
    },
  },

  price: {
    compact: 'font-medium text-blue-600',
    default: 'font-semibold text-blue-600',
  },

  layout: {
    vertical: {
      container: 'space-y-2',
      info: 'space-y-1 text-sm text-gray-600',
    },
    horizontal: {
      compact: {
        container: 'flex items-center gap-3 pr-10',
        content: 'min-w-0 flex-1',
      },
      default: {
        container: 'flex gap-4 pr-12',
        content: 'min-w-0 flex-1',
      },
    },
  },
} as const;
