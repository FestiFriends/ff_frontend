import { ReviewTag, ReviewTagType } from '@/types/enums';

export const ReviewTagLabels: Record<ReviewTagType, string> = {
  [ReviewTag.COMMUNICATIVE]: '대화가 잘 통했어요', // 대화가 잘 통했어요
  [ReviewTag.RECOMMEND]: '다음에도 함께하고 싶어요', // 다음에도 함께하고 싶어요
  [ReviewTag.POLITE]: '친절하고 매너가 좋아요', // 친절하고 매너가 좋아요
  [ReviewTag.PUNCTUAL]: '시간 약속을 잘 지켜요', // 시간 약속을 잘 지켜요
  [ReviewTag.CLEAN]: '청결하고 깔끔했어요', // 청결하고 깔끔했어요
  [ReviewTag.COMFORTABLE]: '편안한 분위기였어요', // 편안한 분위기였어요
  [ReviewTag.RESPONSIVE]: '소통이 잘 되고 응답이 빨라요', // 소통이 잘 되고 응답이 빨라요
};
