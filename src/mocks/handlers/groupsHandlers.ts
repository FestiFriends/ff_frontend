import { isAfter, isBefore, parseISO } from 'date-fns';
import { delay, http, HttpResponse } from 'msw';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { GenderType, GroupCategoryType } from '@/types/enums';
import { CreateGroupApiRequest, Member } from '@/types/group';

export const GROUPS_DATA = [
  {
    id: 'g101',
    title: '락페 처음 가는 사람들 모여요',
    category: '같이 동행',
    gender: '혼성',
    startAge: 20,
    endAge: 35,
    location: '서울 강남',
    startDate: '2025-06-09T10:00:00Z',
    endDate: '2025-06-11T23:00:00Z',
    memberCount: 7,
    maxMembers: 10,
    hashtag: ['락페입문', '인친구해요'],
    isFavorite: true,
    host: {
      hostId: 'host901',
      name: '최락찬',
      rating: 4.6,
    },
    isHost: false,
  },
  {
    id: 'g102',
    title: '자우림 같이 보는 락덕 모임',
    category: '같이 동행',
    gender: '여성',
    startAge: 25,
    endAge: 40,
    location: '경기',
    startDate: '2025-06-10T12:00:00Z',
    endDate: '2025-06-13T22:30:00Z',
    memberCount: 5,
    maxMembers: 8,
    hashtag: ['자우림', '여성모임', '페스티벌덕후'],
    isFavorite: false,
    host: {
      hostId: 'host902',
      name: '박하율',
      rating: 4.9,
    },
    isHost: false,
  },
  {
    id: 'g103',
    title: '3일권 구매자 모여서 캠핑해요!',
    category: '같이 숙박',
    gender: '혼성',
    startAge: 23,
    endAge: 38,
    location: '인천',
    startDate: '2025-08-09T11:00:00Z',
    endDate: '2025-08-11T23:30:00Z',
    memberCount: 9,
    maxMembers: 12,
    hashtag: ['락페캠핑', '3일권', '인천'],
    isFavorite: true,
    host: {
      hostId: 'host903',
      name: '이정훈',
      rating: 4.7,
    },
    isHost: false,
  },
  {
    id: 'g106',
    title: '홍대 → 인천 택시팟 구해요!',
    category: '같이 탑승',
    gender: '혼성',
    startAge: 20,
    endAge: 35,
    location: '서울',
    startDate: '2025-08-09T09:30:00Z',
    endDate: '2025-08-09T11:30:00Z',
    memberCount: 3,
    maxMembers: 4,
    hashtag: ['택시팟', '홍대출발', '카풀'],
    isFavorite: false,
    host: {
      hostId: 'host906',
      name: '유승택',
      rating: 4.6,
    },
    isHost: true,
  },
  {
    id: 'g107',
    title: '일산 거주자 락페 카풀해요 🚗',
    category: '같이 탑승',
    gender: '혼성',
    startAge: 25,
    endAge: 40,
    location: '경기',
    startDate: '2025-08-09T10:00:00Z',
    endDate: '2025-08-09T12:00:00Z',
    memberCount: 2,
    maxMembers: 5,
    hashtag: ['일산출발', '카풀모집', '교통비절약'],
    isFavorite: true,
    host: {
      hostId: 'host907',
      name: '정가람',
      rating: 4.85,
    },
    isHost: false,
  },
  {
    id: 'g108',
    title: '인천에서 출발하는 카풀 구해요!',
    category: '같이 탑승',
    gender: '혼성',
    startAge: 22,
    endAge: 37,
    location: '인천',
    startDate: '2025-08-09T09:00:00Z',
    endDate: '2025-08-09T11:00:00Z',
    memberCount: 2,
    maxMembers: 4,
    hashtag: ['인천출발', '카풀구해요', '교통비절약'],
    isFavorite: false,
    host: {
      hostId: 'host908',
      name: '김지웅',
      rating: 4.5,
    },
    isHost: true,
  },
  {
    id: 'g109',
    title: '소규모 락덕들 모여서 같이 즐겨요',
    category: '같이 동행',
    gender: '혼성',
    startAge: 26,
    endAge: 35,
    location: '충북',
    startDate: '2025-08-09T13:00:00Z',
    endDate: '2025-08-10T22:00:00Z',
    memberCount: 4,
    maxMembers: 6,
    hashtag: ['락덕', '소규모', '함께즐겨요'],
    isFavorite: true,
    host: {
      hostId: 'host909',
      name: '서다인',
      rating: 4.9,
    },
    isHost: false,
  },
  {
    id: 'g110',
    title: '페스티벌 룩 같이 맞춰 입어요👕',
    category: '같이 동행',
    gender: '여성',
    startAge: 20,
    endAge: 30,
    location: '강원',
    startDate: '2025-08-09T11:30:00Z',
    endDate: '2025-08-10T21:30:00Z',
    memberCount: 3,
    maxMembers: 5,
    hashtag: ['페스티벌룩', '인생샷', '코디맞춤'],
    isFavorite: true,
    host: {
      hostId: 'host910',
      name: '오예림',
      rating: 4.88,
    },
    isHost: false,
  },
  {
    id: 'g111',
    title: '락페 끝나고 뒷풀이 갈 분!',
    category: '같이 동행',
    gender: '혼성',
    startAge: 24,
    endAge: 36,
    location: '인천',
    startDate: '2025-08-11T21:30:00Z',
    endDate: '2025-08-12T01:00:00Z',
    memberCount: 6,
    maxMembers: 10,
    hashtag: ['락페뒷풀이', '2차', '음주환영'],
    isFavorite: false,
    host: {
      hostId: 'host911',
      name: '조민재',
      rating: 4.3,
    },
    isHost: true,
  },
  {
    id: 'g112',
    title: '텐트 같이 칠 사람! 장비 있어요',
    category: '같이 숙박',
    gender: '남성',
    startAge: 21,
    endAge: 33,
    location: '인천',
    startDate: '2025-08-09T10:00:00Z',
    endDate: '2025-08-11T23:00:00Z',
    memberCount: 5,
    maxMembers: 6,
    hashtag: ['텐트공유', '캠핑모임', '장비있음'],
    isFavorite: true,
    host: {
      hostId: 'host912',
      name: '백건우',
      rating: 4.75,
    },
    isHost: false,
  },
  {
    id: 'g201',
    title: '혼자보단 같이! 락페 첫 참석자 모임',
    category: '같이 동행',
    gender: '혼성',
    startAge: 22,
    endAge: 34,
    location: '부산',
    startDate: '2025-08-09T10:00:00Z',
    endDate: '2025-08-10T23:00:00Z',
    memberCount: 6,
    maxMembers: 8,
    hashtag: ['락페입문', '동행', '친목'],
    isFavorite: true,
    host: {
      hostId: 'host201',
      name: '이지후',
      rating: 4.7,
    },
    isHost: false,
  },
  {
    id: 'g202',
    title: '페스티벌 같이 놀 사람 (음주 환영)',
    category: '같이 동행',
    gender: '혼성',
    startAge: 25,
    endAge: 35,
    location: '경기',
    startDate: '2025-08-09T14:00:00Z',
    endDate: '2025-08-10T23:00:00Z',
    memberCount: 5,
    maxMembers: 7,
    hashtag: ['술친구', '락페동행', '친목'],
    isFavorite: false,
    host: {
      hostId: 'host202',
      name: '박유성',
      rating: 4.5,
    },
    isHost: true,
  },
  {
    id: 'g203',
    title: '택시 같이 타실 분 (신촌 출발)',
    category: '같이 탑승',
    gender: '남성',
    startAge: 23,
    endAge: 33,
    location: '서울',
    startDate: '2025-08-09T08:30:00Z',
    endDate: '2025-08-09T10:30:00Z',
    memberCount: 2,
    maxMembers: 4,
    hashtag: ['카풀', '교통비절약', '신촌출발'],
    isFavorite: true,
    host: {
      hostId: 'host203',
      name: '정가희',
      rating: 4.8,
    },
    isHost: false,
  },
  {
    id: 'g204',
    title: '자취생 캠핑 모임🔥',
    category: '같이 숙박',
    gender: '남성',
    startAge: 24,
    endAge: 36,
    location: '전남',
    startDate: '2025-08-09T12:00:00Z',
    endDate: '2025-08-11T22:00:00Z',
    memberCount: 4,
    maxMembers: 6,
    hashtag: ['텐트', '자취생', '캠핑'],
    isFavorite: false,
    host: {
      hostId: 'host204',
      name: '김태산',
      rating: 4.6,
    },
    isHost: true,
  },
  {
    id: 'g205',
    title: '음악 이야기 나눌 사람🙌',
    category: '같이 동행',
    gender: '혼성',
    startAge: 26,
    endAge: 38,
    location: '경기',
    startDate: '2025-08-09T13:00:00Z',
    endDate: '2025-08-10T21:00:00Z',
    memberCount: 5,
    maxMembers: 8,
    hashtag: ['음악토크', '락덕', '친목모임'],
    isFavorite: true,
    host: {
      hostId: 'host205',
      name: '최다은',
      rating: 4.9,
    },
    isHost: false,
  },
  {
    id: 'g206',
    title: '부천 출발 카풀 팟🚗',
    category: '같이 탑승',
    gender: '혼성',
    startAge: 25,
    endAge: 40,
    location: '경기',
    startDate: '2025-08-09T09:00:00Z',
    endDate: '2025-08-09T11:00:00Z',
    memberCount: 3,
    maxMembers: 4,
    hashtag: ['부천출발', '택시팟', '카풀'],
    isFavorite: false,
    host: {
      hostId: 'host206',
      name: '윤동진',
      rating: 4.4,
    },
    isHost: true,
  },
  {
    id: 'g207',
    title: '락페룩 맞춰입을 팀원 구해요💃',
    category: '같이 동행',
    gender: '여성',
    startAge: 20,
    endAge: 30,
    location: '제주',
    startDate: '2025-08-09T11:00:00Z',
    endDate: '2025-08-10T22:00:00Z',
    memberCount: 4,
    maxMembers: 6,
    hashtag: ['페스티벌룩', '코디', '인생샷'],
    isFavorite: true,
    host: {
      hostId: 'host207',
      name: '장소연',
      rating: 4.85,
    },
    isHost: false,
  },
  {
    id: 'g208',
    title: '퇴근하고 바로 락페 고!',
    category: '같이 동행',
    gender: '혼성',
    startAge: 27,
    endAge: 39,
    location: '서울',
    startDate: '2025-08-09T18:00:00Z',
    endDate: '2025-08-10T23:00:00Z',
    memberCount: 6,
    maxMembers: 9,
    hashtag: ['직장인', '퇴근러', '빠른합류'],
    isFavorite: false,
    host: {
      hostId: 'host208',
      name: '홍승우',
      rating: 4.7,
    },
    isHost: false,
  },
  {
    id: 'g209',
    title: '음악덕후들만 모여요🎧',
    category: '같이 동행',
    gender: '혼성',
    startAge: 22,
    endAge: 33,
    location: '강원',
    startDate: '2025-08-10T10:00:00Z',
    endDate: '2025-08-11T22:00:00Z',
    memberCount: 5,
    maxMembers: 8,
    hashtag: ['덕질환영', '락페', '음악토크'],
    isFavorite: true,
    host: {
      hostId: 'host209',
      name: '백승리',
      rating: 4.9,
    },
    isHost: true,
  },
  {
    id: 'g210',
    title: '락페 뒷풀이까지 완벽하게🔥',
    category: '같이 동행',
    gender: '여성',
    startAge: 24,
    endAge: 36,
    location: '인천',
    startDate: '2025-08-11T22:00:00Z',
    endDate: '2025-08-12T02:00:00Z',
    memberCount: 4,
    maxMembers: 10,
    hashtag: ['뒷풀이', '2차', '락페마무리'],
    isFavorite: false,
    host: {
      hostId: 'host210',
      name: '송민정',
      rating: 4.6,
    },
    isHost: true,
  },
  {
    id: 'g211',
    title: '헤드라이너 무대 앞자리에서 함께해요🔥',
    category: '같이 동행',
    gender: '혼성',
    startAge: 23,
    endAge: 35,
    location: '세종',
    startDate: '2025-08-09T17:00:00Z',
    endDate: '2025-08-09T23:00:00Z',
    memberCount: 6,
    maxMembers: 8,
    hashtag: ['헤드라이너', '앞자리', '떼창'],
    isFavorite: true,
    host: {
      hostId: 'host211',
      name: '신재욱',
      rating: 4.8,
    },
    isHost: false,
  },
  {
    id: 'g212',
    title: '락페 올나잇 즐길 분 찾습니다🌙',
    category: '같이 숙박',
    gender: '혼성',
    startAge: 24,
    endAge: 36,
    location: '인천',
    startDate: '2025-08-09T20:00:00Z',
    endDate: '2025-08-10T07:00:00Z',
    memberCount: 4,
    maxMembers: 6,
    hashtag: ['올나잇', '불멍', '야간무대'],
    isFavorite: false,
    host: {
      hostId: 'host212',
      name: '한지윤',
      rating: 4.7,
    },
    isHost: true,
  },
  {
    id: 'g213',
    title: '락페 셋리스트 미리 듣고 가실 분🎶',
    category: '같이 동행',
    gender: '혼성',
    startAge: 21,
    endAge: 33,
    location: '서울',
    startDate: '2025-08-08T19:00:00Z',
    endDate: '2025-08-08T22:00:00Z',
    memberCount: 5,
    maxMembers: 7,
    hashtag: ['셋리스트', '예습모임', '락덕'],
    isFavorite: true,
    host: {
      hostId: 'host213',
      name: '김혜림',
      rating: 4.85,
    },
    isHost: false,
  },
  {
    id: 'g214',
    title: '락페 브이로그 찍을 분📹',
    category: '같이 동행',
    gender: '혼성',
    startAge: 20,
    endAge: 32,
    location: '경기',
    startDate: '2025-08-02T10:00:00Z',
    endDate: '2025-08-04T23:00:00Z',
    memberCount: 3,
    maxMembers: 5,
    hashtag: ['브이로그', '촬영', '기록남기기'],
    isFavorite: false,
    host: {
      hostId: 'host214',
      name: '최은호',
      rating: 4.6,
    },
    isHost: true,
  },
  {
    id: 'g215',
    title: '락페 메탈 존 매니아들 모여라🤘',
    category: '같이 동행',
    gender: '혼성',
    startAge: 26,
    endAge: 40,
    location: '대전',
    startDate: '2025-08-01T12:00:00Z',
    endDate: '2025-08-03T23:00:00Z',
    memberCount: 6,
    maxMembers: 10,
    hashtag: ['메탈존', '헤드뱅잉', '락스피릿'],
    isFavorite: true,
    host: {
      hostId: 'host215',
      name: '오세민',
      rating: 4.9,
    },
    isHost: false,
  },
  {
    id: 'g216',
    title: '락페 입장 동선 같이 맞춰요🎟️',
    category: '같이 동행',
    gender: '혼성',
    startAge: 23,
    endAge: 35,
    location: '광주',
    startDate: '2025-08-01T09:00:00Z',
    endDate: '2025-08-03T10:00:00Z',
    memberCount: 2,
    maxMembers: 5,
    hashtag: ['일찍입장', '줄서기', '자유석'],
    isFavorite: true,
    host: {
      hostId: 'host216',
      name: '류지영',
      rating: 4.75,
    },
    isHost: false,
  },
  {
    id: 'g217',
    title: '락페 포토스팟 탐방 모임📸',
    category: '같이 동행',
    gender: '혼성',
    startAge: 22,
    endAge: 34,
    location: '인천',
    startDate: '2025-08-09T11:00:00Z',
    endDate: '2025-08-10T21:00:00Z',
    memberCount: 4,
    maxMembers: 6,
    hashtag: ['포토스팟', '인생샷', 'SNS업로드'],
    isFavorite: true,
    host: {
      hostId: 'host217',
      name: '배하늘',
      rating: 4.8,
    },
    isHost: false,
  },
  {
    id: 'g218',
    title: '락페 공식 굿즈 같이 구매하실 분🎁',
    category: '같이 동행',
    gender: '혼성',
    startAge: 24,
    endAge: 38,
    location: '전북',
    startDate: '2025-08-01T10:30:00Z',
    endDate: '2025-08-02T12:00:00Z',
    memberCount: 3,
    maxMembers: 6,
    hashtag: ['굿즈', '기념품', '같이줄서기'],
    isFavorite: false,
    host: {
      hostId: 'host218',
      name: '김유하',
      rating: 4.65,
    },
    isHost: true,
  },
  {
    id: 'g219',
    title: '락페 끝나고 음악 공유모임🎧',
    category: '같이 동행',
    gender: '혼성',
    startAge: 25,
    endAge: 37,
    location: '경북',
    startDate: '2025-08-12T18:00:00Z',
    endDate: '2025-08-12T21:00:00Z',
    memberCount: 5,
    maxMembers: 8,
    hashtag: ['후기나눔', '음악공유', '락덕'],
    isFavorite: true,
    host: {
      hostId: 'host219',
      name: '윤정현',
      rating: 4.9,
    },
    isHost: false,
  },
  {
    id: 'g220',
    title: '락페 캠핑존 사전답사 모임⛺',
    category: '같이 숙박',
    gender: '혼성',
    startAge: 23,
    endAge: 35,
    location: '경기',
    startDate: '2025-08-08T15:00:00Z',
    endDate: '2025-08-08T18:00:00Z',
    memberCount: 3,
    maxMembers: 5,
    hashtag: ['캠핑존', '답사', '미리보기'],
    isFavorite: false,
    host: {
      hostId: 'host220',
      name: '이수빈',
      rating: 4.7,
    },
    isHost: true,
  },
  {
    id: 'g221',
    title: '락페 끝나고 음악 공유모임🎧2',
    category: '같이 동행',
    gender: '혼성',
    startAge: 25,
    endAge: 37,
    location: '경남',
    startDate: '2025-08-12T18:00:00Z',
    endDate: '2025-08-12T21:00:00Z',
    memberCount: 5,
    maxMembers: 8,
    hashtag: ['후기나눔', '음악공유', '락덕'],
    isFavorite: true,
    host: {
      hostId: 'host219',
      name: '윤정현',
      rating: 4.9,
    },
    isHost: false,
  },
];

export const GROUP_MEMBERS_DATA: Member[] = Array.from(
  { length: 100 },
  (_, i) => ({
    memberId: `member-${i + 1}`,
    name: `멤버 ${i + 1}`,
    profileImage: `https://picsum.photos/seed/member${(i % 70) + 1}/200/300`,
    role: i === 0 ? 'HOST' : 'MEMBER',
  })
);

export const groupsHandlers = [
  http.get(
    'http://localhost:3000/api/v1/performances/:performanceId/groups',
    ({ request }) => {
      let newGroup = [...GROUPS_DATA];
      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page'));
      const size = Number(url.searchParams.get('size'));
      const sort = url.searchParams.get('sort');
      const category = url.searchParams.get('category') as GroupCategoryType;
      const startDate = url.searchParams.get('startDate');
      const endDate = url.searchParams.get('endDate');
      const location = url.searchParams.get('location');
      const gender = url.searchParams.get('gender') as GenderType;

      if (category) {
        newGroup = newGroup.filter(
          (group) => group.category === GroupCategoryLabels[category]
        );
      }

      if (startDate && endDate) {
        const filterStart = parseISO(startDate);
        const filterEnd = parseISO(endDate);

        newGroup = newGroup.filter((group) => {
          const groupStart = parseISO(group.startDate);
          const groupEnd = parseISO(group.endDate);

          return (
            !isBefore(groupEnd, filterStart) && !isAfter(groupStart, filterEnd)
          );
        });
      }

      if (location) {
        newGroup = newGroup.filter((group) =>
          group.location.includes(location)
        );
      }

      if (gender) {
        newGroup = newGroup.filter(
          (group) => group.gender === GenderLabels[gender]
        );
      }

      if (sort) {
        newGroup = newGroup.sort((x, y) =>
          sort === 'date_asc'
            ? Date.parse(x.startDate) - Date.parse(y.startDate)
            : Date.parse(y.startDate) - Date.parse(x.startDate)
        );
      }

      const slicedGroup = newGroup.slice((page - 1) * size, page * size);

      return HttpResponse.json({
        code: 200,
        message: '요청이 성공적으로 처리되었습니다.',
        data: {
          performanceId: 'pf-20250522',
          groupCount: newGroup.length,
          groups: slicedGroup,
          page: page,
          size: size,
          totalElements: newGroup.length,
          totalPages: Math.floor((newGroup.length - 1) / size) + 1,
          first: page === 1,
          last: page === Math.floor((newGroup.length - 1) / size) + 1,
        },
      });
    }
  ),
  http.post('http://localhost:3000/api/v1/groups', async ({ request }) => {
    const body = (await request.json()) as CreateGroupApiRequest;

    const newGroupId = `g${Date.now()}`;
    const newGroup = {
      id: newGroupId,
      title: body.title,
      category: body.category,
      gender:
        body.gender === 'MALE'
          ? '남성'
          : body.gender === 'FEMALE'
            ? '여성'
            : '혼성',
      startAge: body.startAge,
      endAge: body.endAge,
      location: body.location,
      startDate: body.startDate,
      endDate: body.endDate,
      memberCount: 1,
      maxMembers: body.maxMembers,
      description: body.description,
      hashtag: body.hashtag || [],
      isFavorite: false,
      host: {
        hostId: 'host-current-user',
        name: '현재 사용자',
        rating: 4.5,
      },
      isHost: true,
    };

    GROUPS_DATA.unshift(newGroup);

    return HttpResponse.json({
      code: 201,
      message: '모임이 성공적으로 생성되었습니다.',
      data: {
        groupId: newGroupId,
        performanceId: body.performanceId,
      },
    });
  }),
  http.get(
    'http://localhost:3000/api/v1/groups/:groupId/members',
    async ({ request }) => {
      await delay(2000);
      const url = new URL(request.url);
      const groupId = url.searchParams.get('groupId');
      const cursorId = Number(url.searchParams.get('cursorId'));
      const size = Number(url.searchParams.get('size')) || 20;

      const startIndex = isNaN(cursorId) ? 0 : cursorId;
      const endIndex = startIndex + size;
      const slicedData = GROUP_MEMBERS_DATA.slice(startIndex, endIndex);

      const hasNext = endIndex < GROUP_MEMBERS_DATA.length;
      const nextCursorId = hasNext ? endIndex : undefined;

      return HttpResponse.json({
        success: true,
        message: '그룹 멤버 조회 성공',
        data: {
          groupId,
          performanceId: 'performance-123',
          memberCount: GROUP_MEMBERS_DATA.length,
          members: slicedData,
        },
        hasNext,
        cursorId: nextCursorId,
      });
    }
  ),
];
