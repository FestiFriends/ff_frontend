import {
  FormEvent,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
  useRef,
} from 'react';
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
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className='flex w-full cursor-pointer items-center gap-2 rounded-[100px] bg-gray-25 px-3 py-1.5 focus-within:border focus-within:border-gray-700 focus:border focus:border-gray-700'
    >
      <SearchIcon
        className='text-gray-500'
        onClick={() => formRef.current?.submit()}
      />
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
