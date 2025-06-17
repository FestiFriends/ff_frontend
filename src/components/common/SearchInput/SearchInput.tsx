import { FormEvent, InputHTMLAttributes, PropsWithChildren, Ref } from 'react';
import SearchIcon from '@/components/icons/SearchIcon';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement | null>;
  onSubmit: () => void;
}

const SearchInput = ({
  onSubmit,
  children,
  ...props
}: PropsWithChildren<SearchInputProps>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full cursor-pointer items-center gap-2 rounded-[100px] bg-gray-25 px-3 py-1.5 focus-within:border focus-within:border-gray-700 focus:border focus:border-gray-700'
    >
      <button type='submit'>
        <SearchIcon className='text-gray-500' />
      </button>
      <input
        {...props}
        type='search'
        aria-label='검색어 입력'
      />
      <button type='submit'>{children}</button>
    </form>
  );
};

export default SearchInput;
