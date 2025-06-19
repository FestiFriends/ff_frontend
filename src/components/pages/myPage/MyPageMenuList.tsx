import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalClose from '@/components/common/Modal/ModalClose';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import { useLogout, useWithdraw } from '@/hooks/useAuth/useAuth';
import { cn } from '@/lib/utils';
import PrivacyPolicyContent from './legal/PrivacyPolicyContent';
import TermsContent from './legal/TermsContent';

const MyPageMenuList = () => {
  const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const handleToggle = () => {
  //   setIsDarkMode((prev) => !prev);
  // };

  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', isDarkMode);
  // }, [isDarkMode]);

  const handleWithdraw = () => {
    if (confirm('정말로 회원 탈퇴하시겠습니까?')) {
      withdraw();
    }
  };

  return (
    <ul className='w-full max-w-md space-y-4 text-14_M'>
      <Modal>
        <li className='flex h-10 w-full items-center px-[4px]'>
          <Link
            href='/mypage/reviews?tab=writable'
            className='w-full'
          >
            리뷰 관리
          </Link>
        </li>
        <li className='flex h-10 w-full items-center px-[4px]'>
          <a
            href='https://pf.kakao.com/_zkjan/chat'
            target='_blank'
            rel='noopener noreferrer'
            className='w-full'
          >
            1:1 문의
          </a>
        </li>
        <li className='flex h-10 w-full items-center px-[4px]'>
          <ModalTrigger>
            <span className='w-full'>약관 및 정책</span>
          </ModalTrigger>
        </li>
        {/* <li className='flex h-10 items-center justify-between px-[4px]'>
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
        </li> */}
        <li
          className={cn(
            'flex h-10 w-full items-center px-[4px] text-red-600',
            isWithdrawing && 'cursor-not-allowed opacity-60'
          )}
        >
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            className='w-full text-left'
          >
            {isWithdrawing ? '회원 탈퇴 중...' : '회원 탈퇴'}
          </button>
        </li>

        <ModalContent className='max-h-[80vh] w-[90vw] max-w-2xl overflow-y-auto rounded-xl bg-white p-6 text-sm leading-relaxed shadow-xl'>
          <ModalClose />
          <TermsContent />
          <div className='my-6 border-t' />
          <PrivacyPolicyContent />
          <p className='text-10_M mt-6 text-gray-500'>
            본 정책은 2025년 6월 1일부터 적용됩니다.
          </p>
        </ModalContent>
      </Modal>
      <div className='w-full border-t bg-white px-4 py-4'>
        <Button
          onClick={() => logout()}
          disabled={isLoggingOut}
          className={cn(
            'w-full rounded px-4 py-2 text-white transition',
            isLoggingOut
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-red-500 hover:bg-red-600'
          )}
        >
          {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
        </Button>
      </div>
    </ul>
  );
};
export default MyPageMenuList;
