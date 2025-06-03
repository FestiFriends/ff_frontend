import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import ReviewRating from './ReviewRating';

interface MainReviewCardProps {
  nickname: string;
  groupTitle: string;
  ratings: number;
  content?: string;
  imgSrc?: string;
}

const MainReviewCard = ({
  nickname,
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
      />
      <div className='flex flex-col gap-1'>
        <span className='flex h-4 items-center text-13_M text-gray-500'>
          {nickname}
        </span>
        <h4 className='flex h-[17px] items-center text-14_B text-gray-950'>
          {groupTitle}
        </h4>
      </div>
    </header>

    <ReviewRating rating={ratings} />

    <p className='line-clamp-2 h-[50px] text-14_body_M text-gray-950'>
      {content}
    </p>
  </div>
);
export default MainReviewCard;
