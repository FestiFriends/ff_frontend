import { useEffect, useState } from 'react';

const MyPageMenuList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <ul className='w-full max-w-md space-y-4 text-14_M'>
      <li className='flex h-10 w-full items-center px-[4px]'>리뷰 관리</li>
      <li className='flex h-10 w-full items-center px-[4px]'>1:1 문의</li>
      <li className='flex h-10 w-full items-center px-[4px]'>약관 및 정책</li>
      <li className='flex h-10 items-center justify-between px-[4px]'>
        <span>다크 모드 전환</span>
        <label className='relative inline-flex cursor-pointer items-center'>
          <span className='sr-only'>다크 모드 전환</span>
          <input
            type='checkbox'
            checked={isDarkMode}
            onChange={handleToggle}
            className='peer sr-only'
          />
          <div className='h-5 w-10 rounded-full bg-gray-200 transition peer-checked:bg-blue-500' />
          <div className='absolute top-1 left-1 h-3 w-3 rounded-full bg-white transition peer-checked:translate-x-5' />
        </label>
      </li>
    </ul>
  );
};

export default MyPageMenuList;
