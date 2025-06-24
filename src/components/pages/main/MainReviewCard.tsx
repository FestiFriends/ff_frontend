import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import ReviewRating from './ReviewRating';

interface MainReviewCardProps {
  nickname?: string;
  performanceTitle?: string;
  groupTitle: string;
  ratings: number;
  content?: string;
  imgSrc?: string;
}

const MainReviewCard = ({
  // nickname,
  performanceTitle,
  groupTitle,
  ratings,
  content,
  imgSrc,
}: MainReviewCardProps) => (
  <div className='flex w-[233px] flex-col gap-4 rounded-2xl border border-gray-100 p-5'>
    <header className='flex max-w-[193px] items-center gap-2.5'>
      <ProfileImage
        size='sm'
        src={imgSrc}
        className='aspect-square shrink-0 rounded-[12px]'
      />
      <div className='flex flex-col gap-1'>
        <span className='line-clamp-1 text-13_M leading-normal tracking-[-0.325px] text-gray-500'>
          {performanceTitle}
        </span>
        {/* <span className='flex h-4 items-center text-13_M leading-normal tracking-[-0.35px] text-gray-500'>
          {nickname}
        </span> */}
        <h4 className='flex items-center text-14_B leading-normal tracking-[-0.35px] text-gray-950'>
          {groupTitle}
        </h4>
      </div>
    </header>

    <ReviewRating rating={ratings} />

    <p className='line-clamp-2 h-[50px] text-14_body_M leading-[180%] tracking-[-0.35px] text-gray-950'>
      {content}
    </p>
  </div>
);
export default MainReviewCard;
