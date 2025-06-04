export const STYLES = {
  root: 'relative cursor-pointer rounded-lg border bg-white transition-shadow hover:shadow-lg',

  image: {
    container: 'relative aspect-[3/4] w-24 overflow-hidden rounded',
    image: 'object-cover',
    fallback:
      'flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-400',
  },

  content: {
    dateRange: 'text-sm text-gray-600',
    cast: 'text-sm text-gray-600',
    price: 'font-semibold text-blue-600',
  },

  status: {
    base: 'mr-2 inline-block rounded px-2 py-1 text-sm',
    ended: 'bg-gray-100 text-gray-600',
    ongoing: 'bg-green-100 text-green-700',
    upcoming: 'bg-blue-100 text-blue-700',
  },

  likeButton: {
    base: 'absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white',
    text: 'ml-1',
  },
} as const;
