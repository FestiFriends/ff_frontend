interface ReviewListProps {
  reviews: string[];
  reviewCount: number;
}

const ReviewList = ({ reviews, reviewCount }: ReviewListProps) => (
  <div>
    <p className='text-sm'>총 {reviewCount}개의 리뷰를 받았어요.</p>
    <ul className='mt-2 space-y-3'>
      {reviews.map((text, index) => (
        <li
          key={index}
          className='rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm'
        >
          {text}
        </li>
      ))}
    </ul>
  </div>
);

export default ReviewList;
