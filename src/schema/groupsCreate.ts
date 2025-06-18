import { z } from 'zod';

const dateRangeSchema = z
  .object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
  })
  .refine((data) => data.startDate !== null, {
    message: '시작 날짜를 선택해주세요',
  });

export const groupCreateSchema = z.object({
  name: z.string().min(1, '공연 이름을 입력해주세요'),
  category: z.enum(['동행', '탐승', '숙박'], {
    required_error: '종류를 선택해주세요',
  }),
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().min(10, '소개글을 10자 이상 입력해주세요'),
  region: z.string().min(1, '지역을 선택해주세요'),
  dateRange: dateRangeSchema,
  gender: z.enum(['여성', '남성', '혼성'], {
    required_error: '성별을 선택해주세요',
  }),
  ageRange: z.tuple([z.number(), z.number()]),
  maxParticipants: z
    .number()
    .min(1, '최소 1명 이상이어야 합니다')
    .max(100, '최대 100명까지 가능합니다'),
  tags: z.array(z.string()).min(1, '태그를 하나 이상 추가해주세요'),
});
