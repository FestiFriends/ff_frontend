import { z } from 'zod';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { LocationLabels } from '@/constants/locationLabels';

const dateRangeSchema = z
  .object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
  })
  .refine((data) => data.startDate !== null, {
    message: '시작 날짜를 선택해주세요',
  })
  .refine((data) => data.endDate !== null, {
    message: '종료 날짜를 선택해주세요',
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: '시작 날짜는 종료 날짜보다 이전이어야 합니다',
    }
  );

export const groupCreateSchema = z.object({
  name: z
    .string({ required_error: '공연 이름이 필요합니다' })
    .min(1, '공연 이름을 입력해주세요'),
  category: z.enum(
    [
      GroupCategoryLabels.COMPANION,
      GroupCategoryLabels.RIDE_SHARE,
      GroupCategoryLabels.ROOM_SHARE,
    ] as const,
    {
      required_error: '모임 종류를 선택해주세요',
      invalid_type_error: '유효한 모임 종류를 선택해주세요',
    }
  ),
  title: z
    .string({ required_error: '제목이 필요합니다' })
    .min(1, '모임 제목을 입력해주세요')
    .max(50, '제목은 50자 이하로 입력해주세요'),
  description: z
    .string({ required_error: '소개글이 필요합니다' })
    .min(10, '소개글을 10자 이상 입력해주세요')
    .max(500, '소개글은 500자 이하로 입력해주세요'),
  region: z
    .string()
    .refine((val) => Object.values(LocationLabels).includes(val), {
      message: '지역을 선택해주세요',
    }),
  dateRange: dateRangeSchema,
  gender: z
    .string()
    .refine((val) => Object.values(GenderLabels).includes(val), {
      message: '참가 성별을 선택해주세요',
    }),
  ageRange: z
    .tuple([z.number(), z.number()], {
      required_error: '연령대를 설정해주세요',
      invalid_type_error: '유효한 연령대를 설정해주세요',
    })
    .refine(([min, max]) => min <= max, {
      message: '최소 연령은 최대 연령보다 작거나 같아야 합니다',
    }),
  maxParticipants: z
    .number({ required_error: '참여 인원 수가 필요합니다' })
    .min(2, '최소 2명 이상이어야 합니다')
    .max(50, '최대 50명까지 가능합니다')
    .int('참여 인원 수는 정수여야 합니다'),
  tags: z
    .array(z.string(), { required_error: '태그가 필요합니다' })
    .min(1, '태그를 최소 1개 이상 추가해주세요')
    .max(10, '태그는 최대 10개까지 추가할 수 있습니다'),
});
