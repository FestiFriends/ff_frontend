import { FormEvent, InputHTMLAttributes, PropsWithChildren, Ref } from 'react';

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
    <form onSubmit={handleSubmit}>
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
