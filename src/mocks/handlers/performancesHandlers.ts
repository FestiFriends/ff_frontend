import { http, HttpResponse } from 'msw';
import { PerformancesResponse, Performance } from '@/types/performance';

const TOP_FAVORITES_SAMPLE_DATA: PerformancesResponse = {
  code: 200,
  message: '요청이 성공적으로 처리되었습니다.',
  data: [
    {
      id: 'pf-20250522',
      title: '2025 서울 재즈 페스티벌asdasdasdasd',
      startDate: '2025-05-30T18:00:00Z',
      endDate: '2025-06-01T22:00:00Z',
      location: '올림픽공원 88잔디마당',
      cast: ['존 바티스트', '이하이', '혁오'],
      crew: ['김철수', '박예은'],
      runtime: '180분',
      age: '만 12세 이상',
      productionCompany: ['서울예술기획'],
      agency: ['재즈엔터테인먼트'],
      host: ['서울특별시'],
      organizer: ['SJF조직위'],
      price: ['일반석 99,000원', 'VIP석 150,000원'],
      poster: 'https://picsum.photos/200/300',
      state: '예매중',
      visit: '국내',
      images: [
        {
          id: 'img-001',
          src: 'https://picsum.photos/200/300',
          alt: '페스티벌 메인 무대',
        },
        {
          id: 'img-002',
          src: 'https://picsum.photos/200/300',
          alt: '야경 속 재즈 공연',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 20,
      favoriteCount: 10000,
      isLiked: false,
    },
    {
      id: 'pf-20251001',
      title: '고객 중심 차별화 전략',
      startDate: '2025-07-01T18:00:00Z',
      endDate: '2025-07-03T22:00:00Z',
      location: '경기도 김정현동 748-24',
      cast: ['이은우', '오승희', '박은우'],
      crew: ['이한결', '박승민'],
      runtime: '180분',
      age: '만 7세 이상',
      productionCompany: ['윤주 (주)'],
      agency: ['이서준 (주)'],
      host: ['정지윤 (유)'],
      organizer: ['오주원 (유)'],
      price: ['일반석 97907원', 'VIP석 148307원'],
      poster: 'https://picsum.photos/seed/perf1/400/600',
      state: '공연중',
      visit: '국내',
      images: [
        {
          id: 'img-11',
          src: 'https://picsum.photos/seed/perf11/800/600',
          alt: '대한민국 불구하고 나타났다.',
        },
        {
          id: 'img-12',
          src: 'https://picsum.photos/seed/perf12/800/600',
          alt: '예를 들어 강력한 의무가',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 18,
      favoriteCount: 7160,
      isLiked: true,
    },
    {
      id: 'pf-20251002',
      title: '마케팅 구조 역량',
      startDate: '2025-07-01T18:00:00Z',
      endDate: '2025-07-03T22:00:00Z',
      location: '대전광역시 김경숙길 638',
      cast: ['이서진', '박현서', '김지아'],
      crew: ['최지민', '강지윤'],
      runtime: '120분',
      age: '만 15세 이상',
      productionCompany: ['김가영 (주)'],
      agency: ['윤준호 (주)'],
      host: ['정예린 (주)'],
      organizer: ['강예준 (주)'],
      price: ['일반석 93156원', 'VIP석 158086원'],
      poster: 'https://picsum.photos/seed/perf2/400/600',
      state: '예정',
      visit: '내한',
      images: [
        {
          id: 'img-21',
          src: 'https://picsum.photos/seed/perf21/800/600',
          alt: '이러한 줄 알았지만',
        },
        {
          id: 'img-22',
          src: 'https://picsum.photos/seed/perf22/800/600',
          alt: '생산성 빠르게 동기화됩니다',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 11,
      favoriteCount: 7548,
      isLiked: false,
    },
    {
      id: 'pf-20251003',
      title: '혁신적 브랜드 정체성',
      startDate: '2025-07-01T18:00:00Z',
      endDate: '2025-07-03T22:00:00Z',
      location: '울산광역시 김성은거리 234',
      cast: ['김예린', '이현우', '정지훈'],
      crew: ['조하은', '유하준'],
      runtime: '150분',
      age: '전체 관람가',
      productionCompany: ['박윤아 (주)'],
      agency: ['김하윤 (주)'],
      host: ['이서우 (주)'],
      organizer: ['조예준 (주)'],
      price: ['일반석 80537원', 'VIP석 147157원'],
      poster: 'https://picsum.photos/seed/perf3/400/600',
      state: '공연중',
      visit: '내한',
      images: [
        {
          id: 'img-31',
          src: 'https://picsum.photos/seed/perf31/800/600',
          alt: '강력한 정보 정확히 공유합니다',
        },
        {
          id: 'img-32',
          src: 'https://picsum.photos/seed/perf32/800/600',
          alt: '기획 분석 함께 한다',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 18,
      favoriteCount: 8412,
      isLiked: false,
    },
    {
      id: 'pf-20251004',
      title: '글로벌 고객 확보 전략',
      startDate: '2025-07-01T18:00:00Z',
      endDate: '2025-07-03T22:00:00Z',
      location: '서울특별시 홍예진거리 193',
      cast: ['최하은', '정하린', '이서준'],
      crew: ['김정후', '오예원'],
      runtime: '120분',
      age: '만 12세 이상',
      productionCompany: ['김정호 (주)'],
      agency: ['이주연 (주)'],
      host: ['박주원 (주)'],
      organizer: ['정하린 (주)'],
      price: ['일반석 93608원', 'VIP석 140936원'],
      poster: 'https://picsum.photos/seed/perf4/400/600',
      state: '공연중',
      visit: '내한',
      images: [
        {
          id: 'img-41',
          src: 'https://picsum.photos/seed/perf41/800/600',
          alt: '우리 함께 기획하는 전략',
        },
        {
          id: 'img-42',
          src: 'https://picsum.photos/seed/perf42/800/600',
          alt: '대규모 팀과의 협력',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 15,
      favoriteCount: 8089,
      isLiked: true,
    },
  ],
};

const TOP_GROUPS_SAMPLE_DATA: PerformancesResponse = {
  code: 200,
  message: '요청이 성공적으로 처리되었습니다.',
  data: [
    {
      id: 'pf-20251001',
      title: 'Tempore Culpa 페스티벌',
      startDate: '2025-06-07T10:26:44',
      endDate: '2025-06-09T12:26:44',
      location: '인천광역시 성북구 봉은사로 (도윤김김마을)',
      cast: ['김재호', '김은서', '김지원'],
      crew: ['이민지', '이미숙'],
      runtime: '90분',
      age: '만 12세 이상',
      productionCompany: ['김홍'],
      agency: ['송서'],
      host: ['박우'],
      organizer: ['이최'],
      price: ['일반석 66049원', 'VIP석 124628원'],
      poster: 'https://picsum.photos/seed/perf1/400/600',
      state: '예정',
      visit: '국내',
      images: [
        {
          id: 'img-11',
          src: 'https://picsum.photos/seed/perf11/800/600',
          alt: 'Nulla similique neque provident.',
        },
        {
          id: 'img-12',
          src: 'https://picsum.photos/seed/perf12/800/600',
          alt: 'Ut.',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 26,
      favoriteCount: 9935,
      isLiked: true,
    },
    {
      id: 'pf-20251002',
      title: 'Eum Illum 페스티벌',
      startDate: '2025-06-07T18:25:25',
      endDate: '2025-06-09T20:25:25',
      location: '강원도 수원시 장안구 반포대525거리',
      cast: ['이진우', '강보람', '김영미'],
      crew: ['윤윤서', '홍지영'],
      runtime: '180분',
      age: '전체 관람가',
      productionCompany: ['김김'],
      agency: ['이김'],
      host: ['백최'],
      organizer: ['오김'],
      price: ['일반석 51952원', 'VIP석 116140원'],
      poster: 'https://picsum.photos/seed/perf2/400/600',
      state: '예정',
      visit: '국내',
      images: [
        {
          id: 'img-21',
          src: 'https://picsum.photos/seed/perf21/800/600',
          alt: 'Id totam itaque.',
        },
        {
          id: 'img-22',
          src: 'https://picsum.photos/seed/perf22/800/600',
          alt: 'Consequuntur quia.',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 21,
      favoriteCount: 1434,
      isLiked: false,
    },
    {
      id: 'pf-20251003',
      title: 'Quidem Fuga 페스티벌',
      startDate: '2025-06-11T19:35:42',
      endDate: '2025-06-13T22:35:42',
      location: '경상북도 포천시 테헤란가 (유진고읍)',
      cast: ['안영자', '이현준', '우지혜'],
      crew: ['오정수', '이은주'],
      runtime: '180분',
      age: '만 7세 이상',
      productionCompany: ['김이'],
      agency: ['김오오'],
      host: ['우권'],
      organizer: ['박김'],
      price: ['일반석 79439원', 'VIP석 148618원'],
      poster: 'https://picsum.photos/seed/perf3/400/600',
      state: '공연중',
      visit: '국내',
      images: [
        {
          id: 'img-31',
          src: 'https://picsum.photos/seed/perf31/800/600',
          alt: 'Error odit non corrupti.',
        },
        {
          id: 'img-32',
          src: 'https://picsum.photos/seed/perf32/800/600',
          alt: 'Molestiae quod.',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 29,
      favoriteCount: 3615,
      isLiked: false,
    },
    {
      id: 'pf-20251004',
      title: 'Quia A 페스티벌',
      startDate: '2025-06-10T22:01:51',
      endDate: '2025-06-13T03:01:51',
      location: '세종특별자치시 종로구 영동대거리 (민수양동)',
      cast: ['박도윤', '권미정', '최상훈'],
      crew: ['이서영', '서서영'],
      runtime: '150분',
      age: '만 12세 이상',
      productionCompany: ['이지'],
      agency: ['이박'],
      host: ['김김'],
      organizer: ['이최'],
      price: ['일반석 60189원', 'VIP석 124110원'],
      poster: 'https://picsum.photos/seed/perf4/400/600',
      state: '공연중',
      visit: '국내',
      images: [
        {
          id: 'img-41',
          src: 'https://picsum.photos/seed/perf41/800/600',
          alt: 'Nihil ab.',
        },
        {
          id: 'img-42',
          src: 'https://picsum.photos/seed/perf42/800/600',
          alt: 'Animi architecto adipisci ex.',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 7,
      favoriteCount: 7224,
      isLiked: false,
    },
    {
      id: 'pf-20251005',
      title: 'Quam Ex 페스티벌',
      startDate: '2025-06-08T23:21:34',
      endDate: '2025-06-11T01:21:34',
      location: '충청남도 천안시 동남구 석촌호수가 (은서송읍)',
      cast: ['윤성현', '문도윤', '윤명숙'],
      crew: ['송미영', '박민수'],
      runtime: '150분',
      age: '만 12세 이상',
      productionCompany: ['김박'],
      agency: ['유한회사 송고김'],
      host: ['윤박'],
      organizer: ['김김'],
      price: ['일반석 89565원', 'VIP석 127335원'],
      poster: 'https://picsum.photos/seed/perf5/400/600',
      state: '예정',
      visit: '내한',
      images: [
        {
          id: 'img-51',
          src: 'https://picsum.photos/seed/perf51/800/600',
          alt: 'Cumque laborum.',
        },
        {
          id: 'img-52',
          src: 'https://picsum.photos/seed/perf52/800/600',
          alt: 'Sint temporibus.',
        },
      ],
      time: [
        '화요일 ~ 금요일(20:00)',
        '토요일(16:00,19:00)',
        '일요일(15:00,18:00)',
      ],
      groupCount: 22,
      favoriteCount: 3045,
      isLiked: true,
    },
  ],
};

const FULL_PERFORMANCES_DATA: Performance[] = [
  {
    id: 'pf-20250522',
    title: '2025 서울 재즈 페스티벌',
    startDate: '2025-05-30T18:00:00Z',
    endDate: '2025-06-01T22:00:00Z',
    location: '서울특별시 올림픽공원 88잔디마당',
    cast: ['존 바티스트', '이하이', '혁오'],
    crew: ['김철수', '박예은'],
    runtime: '180분',
    age: '만 12세 이상',
    productionCompany: ['서울예술기획'],
    agency: ['재즈엔터테인먼트'],
    host: ['서울특별시'],
    organizer: ['SJF조직위'],
    price: ['일반석 99,000원', 'VIP석 150,000원'],
    poster: 'https://picsum.photos/seed/newjeans/400/600',
    state: '예매중',
    visit: '국내',
    images: [
      {
        id: 'img-1301',
        src: 'https://picsum.photos/seed/newjeans1/800/600',
        alt: 'NewJeans 팬미팅',
      },
    ],
    time: ['금요일(18:00)', '토요일(18:00)'],
    groupCount: 95,
    favoriteCount: 32000,
    isLiked: true,
  },
  {
    id: 'pf-20251109',
    title: '울산 테크노 페스티벌',
    startDate: '2025-08-05T20:00:00Z',
    endDate: '2025-08-07T04:00:00Z',
    location: '울산광역시 태화강국가정원',
    cast: ['Carl Cox', 'Charlotte de Witte', 'SAMA'],
    crew: ['Ricardo Villalobos', 'Amelie Lens'],
    runtime: '480분',
    age: '만 19세 이상',
    productionCompany: ['울산문화재단'],
    agency: ['테크노코리아'],
    host: ['울산광역시'],
    organizer: ['울산테크노페스티벌조직위'],
    price: ['1일권 140,000원', '3일권 350,000원'],
    poster: 'https://picsum.photos/seed/techno/400/600',
    state: '예정',
    visit: '내한',
    images: [
      {
        id: 'img-1401',
        src: 'https://picsum.photos/seed/techno1/800/600',
        alt: '테크노 페스티벌 밤 무대',
      },
    ],
    time: ['금요일(20:00)', '토요일(20:00)', '일요일(20:00)'],
    groupCount: 38,
    favoriteCount: 7600,
    isLiked: false,
  },
  {
    id: 'pf-20251110',
    title: '연극 <오셀로>',
    startDate: '2025-10-10T19:30:00Z',
    endDate: '2025-11-30T21:30:00Z',
    location: '서울특별시 대학로 아트1극장',
    cast: ['정우성', '한효주', '조진웅'],
    crew: ['임권택', '김기덕'],
    runtime: '130분',
    age: '만 15세 이상',
    productionCompany: ['극단 연우무대'],
    agency: ['연극열전'],
    host: ['서울문화재단'],
    organizer: ['극단 연우무대'],
    price: ['R석 55,000원', 'S석 35,000원'],
    poster: 'https://picsum.photos/seed/othello/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-1501',
        src: 'https://picsum.photos/seed/othello1/800/600',
        alt: '오셀로 연극 장면',
      },
    ],
    time: ['화요일 ~ 토요일(19:30)', '일요일(15:00,18:00)'],
    groupCount: 19,
    favoriteCount: 4800,
    isLiked: false,
  },
  {
    id: 'pf-20251111',
    title: '아리아나 그란데 내한 콘서트',
    startDate: '2025-09-28T19:00:00Z',
    endDate: '2025-09-29T21:30:00Z',
    location: '서울특별시 고척스카이돔',
    cast: ['Ariana Grande'],
    crew: ['Scott Nicholson', 'Liz Gateley'],
    runtime: '150분',
    age: '전체 관람가',
    productionCompany: ['Republic Records'],
    agency: ['Live Nation Korea'],
    host: ['Live Nation Korea'],
    organizer: ['Live Nation Korea'],
    price: ['스탠딩 198,000원', 'VIP 280,000원'],
    poster: 'https://picsum.photos/seed/ariana/400/600',
    state: '예정',
    visit: '내한',
    images: [
      {
        id: 'img-1601',
        src: 'https://picsum.photos/seed/ariana1/800/600',
        alt: '아리아나 그란데 콘서트',
      },
    ],
    time: ['토요일(19:00)', '일요일(18:00)'],
    groupCount: 120,
    favoriteCount: 55000,
    isLiked: true,
  },
  {
    id: 'pf-20251112',
    title: '국립국악원 <정재무>',
    startDate: '2025-11-15T19:00:00Z',
    endDate: '2025-11-17T21:00:00Z',
    location: '서울특별시 국립국악원 예악당',
    cast: ['안숙선', '이자람', '김영임'],
    crew: ['박병천', '정재국'],
    runtime: '90분',
    age: '전체 관람가',
    productionCompany: ['국립국악원'],
    agency: ['국립국악원'],
    host: ['문화체육관광부'],
    organizer: ['국립국악원'],
    price: ['R석 30,000원', 'S석 20,000원'],
    poster: 'https://picsum.photos/seed/gugak/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-1701',
        src: 'https://picsum.photos/seed/gugak1/800/600',
        alt: '정재무 국악 공연',
      },
    ],
    time: ['금요일(19:00)', '토요일(15:00,19:00)', '일요일(15:00)'],
    groupCount: 12,
    favoriteCount: 2800,
    isLiked: false,
  },
  {
    id: 'pf-20251113',
    title: '뮤지컬 <맘마미아!>',
    startDate: '2025-12-01T19:30:00Z',
    endDate: '2026-02-28T22:00:00Z',
    location: '서울특별시 세종문화회관 대극장',
    cast: ['박혜나', '민우혁', '차지연'],
    crew: ['윤호진', '서현석'],
    runtime: '155분',
    age: '만 8세 이상',
    productionCompany: ['라이센스'],
    agency: ['라이센스'],
    host: ['세종문화회관'],
    organizer: ['라이센스'],
    price: ['VIP석 140,000원', 'R석 110,000원', 'S석 80,000원'],
    poster: 'https://picsum.photos/seed/mammamia/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-1801',
        src: 'https://picsum.photos/seed/mammamia1/800/600',
        alt: '맘마미아 뮤지컬',
      },
    ],
    time: [
      '화요일 ~ 금요일(19:30)',
      '토요일(14:00,18:30)',
      '일요일(14:00,18:00)',
    ],
    groupCount: 58,
    favoriteCount: 14200,
    isLiked: true,
  },
  {
    id: 'pf-20251114',
    title: '제주 월드뮤직 페스티벌',
    startDate: '2025-10-20T16:00:00Z',
    endDate: '2025-10-22T23:00:00Z',
    location: '제주특별자치도 제주월드컵경기장',
    cast: ['Yo-Yo Ma', '김덕수 사물놀이', 'Anoushka Shankar'],
    crew: ['탄둔', '김영동'],
    runtime: '360분',
    age: '전체 관람가',
    productionCompany: ['제주특별자치도'],
    agency: ['월드뮤직코리아'],
    host: ['제주특별자치도'],
    organizer: ['제주월드뮤직페스티벌조직위'],
    price: ['1일권 90,000원', '3일권 230,000원'],
    poster: 'https://picsum.photos/seed/worldmusic/400/600',
    state: '예정',
    visit: '내한',
    images: [
      {
        id: 'img-1901',
        src: 'https://picsum.photos/seed/worldmusic1/800/600',
        alt: '제주 월드뮤직 페스티벌',
      },
    ],
    time: ['금요일(16:00)', '토요일(15:00)', '일요일(14:00)'],
    groupCount: 28,
    favoriteCount: 6500,
    isLiked: false,
  },
  {
    id: 'pf-20251115',
    title: '연극 <리어왕>',
    startDate: '2025-11-05T20:00:00Z',
    endDate: '2025-12-20T22:00:00Z',
    location: '서울특별시 명동예술극장',
    cast: ['안성기', '윤여정', '박해일'],
    crew: ['이윤택', '김아랑'],
    runtime: '140분',
    age: '만 14세 이상',
    productionCompany: ['명동예술극장'],
    agency: ['명동예술극장'],
    host: ['정동극장'],
    organizer: ['명동예술극장'],
    price: ['R석 70,000원', 'S석 50,000원'],
    poster: 'https://picsum.photos/seed/lear/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-2001',
        src: 'https://picsum.photos/seed/lear1/800/600',
        alt: '리어왕 연극',
      },
    ],
    time: ['화요일 ~ 토요일(20:00)', '일요일(15:00)'],
    groupCount: 24,
    favoriteCount: 5900,
    isLiked: false,
  },
  {
    id: 'pf-20250601',
    title: '뮤지컬 <레미제라블>',
    startDate: '2025-06-15T19:30:00Z',
    endDate: '2025-09-15T22:00:00Z',
    location: '서울특별시 샤롯데씨어터',
    cast: ['조승우', '김준수', '옥주현'],
    crew: ['김연출', '박무대'],
    runtime: '180분',
    age: '만 8세 이상',
    productionCompany: ['EMK뮤지컬컴퍼니'],
    agency: ['쇼뮤지컬'],
    host: ['EMK엔터테인먼트'],
    organizer: ['EMK뮤지컬컴퍼니'],
    price: ['R석 140,000원', 'S석 110,000원', 'A석 80,000원'],
    poster: 'https://picsum.photos/seed/musical1/400/600',
    state: '예매중',
    visit: '국내',
    images: [
      {
        id: 'img-101',
        src: 'https://picsum.photos/seed/musical11/800/600',
        alt: '레미제라블 주요 장면',
      },
    ],
    time: [
      '화요일 ~ 금요일(19:30)',
      '토요일(14:00,19:30)',
      '일요일(14:00,18:30)',
    ],
    groupCount: 45,
    favoriteCount: 15000,
    isLiked: true,
  },
  {
    id: 'pf-20250701',
    title: '부산 록 페스티벌 2025',
    startDate: '2025-07-20T16:00:00Z',
    endDate: '2025-07-22T23:00:00Z',
    location: '부산광역시 해운대 해변',
    cast: ['장기하와 얼굴들', '새소년', '데이브레이크'],
    crew: ['이음향', '박조명'],
    runtime: '420분',
    age: '만 19세 이상',
    productionCompany: ['부산문화재단'],
    agency: ['록페스타'],
    host: ['부산광역시'],
    organizer: ['부산록페스티벌조직위'],
    price: ['1일권 120,000원', '3일권 300,000원'],
    poster: 'https://picsum.photos/seed/rock/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-201',
        src: 'https://picsum.photos/seed/rock1/800/600',
        alt: '해변 록 페스티벌',
      },
    ],
    time: ['금요일(16:00)', '토요일(14:00)', '일요일(15:00)'],
    groupCount: 30,
    favoriteCount: 8500,
    isLiked: false,
  },
  {
    id: 'pf-20250801',
    title: 'BTS 내한 콘서트',
    startDate: '2025-08-10T19:00:00Z',
    endDate: '2025-08-12T22:00:00Z',
    location: '서울특별시 잠실종합운동장 주경기장',
    cast: ['BTS'],
    crew: ['방시혁', '김프로듀서'],
    runtime: '180분',
    age: '전체 관람가',
    productionCompany: ['하이브'],
    agency: ['빅히트뮤직'],
    host: ['하이브'],
    organizer: ['하이브 콘서트'],
    price: ['스탠딩 198,000원', 'VIP 350,000원'],
    poster: 'https://picsum.photos/seed/bts/400/600',
    state: '공연중',
    visit: '내한',
    images: [
      {
        id: 'img-301',
        src: 'https://picsum.photos/seed/bts1/800/600',
        alt: 'BTS 콘서트 무대',
      },
    ],
    time: ['금요일(19:00)', '토요일(18:00)', '일요일(17:00)'],
    groupCount: 100,
    favoriteCount: 50000,
    isLiked: true,
  },
  {
    id: 'pf-20250901',
    title: '국립발레단 <지젤>',
    startDate: '2025-09-05T19:30:00Z',
    endDate: '2025-09-08T21:30:00Z',
    location: '서울특별시 예술의전당 오페라극장',
    cast: ['김지영', '박세은', '이준'],
    crew: ['최연출', '김음악감독'],
    runtime: '120분',
    age: '만 7세 이상',
    productionCompany: ['국립발레단'],
    agency: ['예술의전당'],
    host: ['문화체육관광부'],
    organizer: ['국립발레단'],
    price: ['VIP석 100,000원', 'R석 70,000원', 'S석 50,000원'],
    poster: 'https://picsum.photos/seed/ballet/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-401',
        src: 'https://picsum.photos/seed/ballet1/800/600',
        alt: '지젤 발레 공연',
      },
    ],
    time: ['목요일 ~ 금요일(19:30)', '토요일(15:00,19:30)', '일요일(15:00)'],
    groupCount: 15,
    favoriteCount: 3200,
    isLiked: false,
  },
  {
    id: 'pf-20251001',
    title: '대전 클래식 오케스트라',
    startDate: '2025-10-15T19:00:00Z',
    endDate: '2025-10-15T21:00:00Z',
    location: '대전광역시 대전문화예술의전당',
    cast: ['대전시향', '지휘자 김마에스트로'],
    crew: ['이음향감독'],
    runtime: '120분',
    age: '만 5세 이상',
    productionCompany: ['대전시향'],
    agency: ['대전문화재단'],
    host: ['대전광역시'],
    organizer: ['대전시향'],
    price: ['VIP석 80,000원', 'R석 60,000원', 'S석 40,000원'],
    poster: 'https://picsum.photos/seed/orchestra/400/600',
    state: '예매중',
    visit: '국내',
    images: [
      {
        id: 'img-501',
        src: 'https://picsum.photos/seed/orchestra1/800/600',
        alt: '오케스트라 연주',
      },
    ],
    time: ['화요일(19:00)'],
    groupCount: 8,
    favoriteCount: 1200,
    isLiked: false,
  },
  {
    id: 'pf-20251101',
    title: '뮤지컬 <캣츠>',
    startDate: '2025-11-01T20:00:00Z',
    endDate: '2025-12-31T22:30:00Z',
    location: '서울특별시 블루스퀘어 삼성전자홀',
    cast: ['민영기', '카이', '정선아'],
    crew: ['최윤정', '박상현'],
    runtime: '150분',
    age: '만 5세 이상',
    productionCompany: ['신시컴퍼니'],
    agency: ['라이브'],
    host: ['CJ문화재단'],
    organizer: ['신시컴퍼니'],
    price: ['VIP석 130,000원', 'R석 100,000원', 'S석 70,000원'],
    poster: 'https://picsum.photos/seed/cats/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-601',
        src: 'https://picsum.photos/seed/cats1/800/600',
        alt: '캣츠 뮤지컬 무대',
      },
    ],
    time: [
      '화요일 ~ 금요일(20:00)',
      '토요일(15:00,19:00)',
      '일요일(15:00,18:00)',
    ],
    groupCount: 52,
    favoriteCount: 12500,
    isLiked: true,
  },
  {
    id: 'pf-20251102',
    title: '아이유 콘서트 <The Golden Hour>',
    startDate: '2025-06-20T19:00:00Z',
    endDate: '2025-06-22T21:30:00Z',
    location: '서울특별시 KSPO DOME (올림픽체조경기장)',
    cast: ['아이유'],
    crew: ['이종훈', '김태호'],
    runtime: '150분',
    age: '전체 관람가',
    productionCompany: ['EDAM엔터테인먼트'],
    agency: ['라이브네이션코리아'],
    host: ['EDAM엔터테인먼트'],
    organizer: ['EDAM엔터테인먼트'],
    price: ['스탠딩 165,000원', 'VIP 220,000원'],
    poster: 'https://picsum.photos/seed/iu/400/600',
    state: '예매중',
    visit: '국내',
    images: [
      {
        id: 'img-701',
        src: 'https://picsum.photos/seed/iu1/800/600',
        alt: '아이유 콘서트 무대',
      },
    ],
    time: ['목요일(19:00)', '금요일(19:00)', '토요일(18:00)'],
    groupCount: 85,
    favoriteCount: 45000,
    isLiked: true,
  },
  {
    id: 'pf-20251103',
    title: '연극 <햄릿>',
    startDate: '2025-07-05T19:30:00Z',
    endDate: '2025-08-25T21:30:00Z',
    location: '서울특별시 대학로 아트원시어터',
    cast: ['이정재', '박해수', '김혜수'],
    crew: ['윤종신', '박찬욱'],
    runtime: '120분',
    age: '만 14세 이상',
    productionCompany: ['극단 모시는사람들'],
    agency: ['플레이db'],
    host: ['문화체육관광부'],
    organizer: ['극단 모시는사람들'],
    price: ['R석 60,000원', 'S석 40,000원'],
    poster: 'https://picsum.photos/seed/hamlet/400/600',
    state: '공연중',
    visit: '국내',
    images: [
      {
        id: 'img-801',
        src: 'https://picsum.photos/seed/hamlet1/800/600',
        alt: '햄릿 연극 장면',
      },
    ],
    time: ['화요일 ~ 토요일(19:30)', '일요일(15:00)'],
    groupCount: 22,
    favoriteCount: 6800,
    isLiked: false,
  },
  {
    id: 'pf-20251104',
    title: '광주 국제 음악제',
    startDate: '2025-09-15T17:00:00Z',
    endDate: '2025-09-17T22:00:00Z',
    location: '광주광역시 김대중컨벤션센터',
    cast: ['조용필', '윤종신', '백지영'],
    crew: ['이수만', '박진영'],
    runtime: '300분',
    age: '전체 관람가',
    productionCompany: ['광주문화재단'],
    agency: ['뮤직페어'],
    host: ['광주광역시'],
    organizer: ['광주국제음악제조직위'],
    price: ['1일권 80,000원', '3일권 200,000원'],
    poster: 'https://picsum.photos/seed/gwangju/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-901',
        src: 'https://picsum.photos/seed/gwangju1/800/600',
        alt: '광주 음악제 메인무대',
      },
    ],
    time: ['금요일(17:00)', '토요일(16:00)', '일요일(15:00)'],
    groupCount: 35,
    favoriteCount: 9200,
    isLiked: false,
  },
  {
    id: 'pf-20251105',
    title: '뮤지컬 <위키드>',
    startDate: '2025-08-01T19:30:00Z',
    endDate: '2025-10-31T22:00:00Z',
    location: '서울특별시 디큐브아트센터',
    cast: ['정선아', '옥주현', '김소현'],
    crew: ['오경택', '김수로'],
    runtime: '165분',
    age: '만 8세 이상',
    productionCompany: ['쇼뮤지컬'],
    agency: ['쇼뮤지컬'],
    host: ['EMK엔터테인먼트'],
    organizer: ['쇼뮤지컬'],
    price: ['VIP석 150,000원', 'R석 120,000원', 'S석 90,000원'],
    poster: 'https://picsum.photos/seed/wicked/400/600',
    state: '예매중',
    visit: '국내',
    images: [
      {
        id: 'img-1001',
        src: 'https://picsum.photos/seed/wicked1/800/600',
        alt: '위키드 뮤지컬 장면',
      },
    ],
    time: [
      '화요일 ~ 금요일(19:30)',
      '토요일(14:00,18:30)',
      '일요일(14:00,18:00)',
    ],
    groupCount: 68,
    favoriteCount: 18500,
    isLiked: true,
  },
  {
    id: 'pf-20251106',
    title: '인천 EDM 페스티벌',
    startDate: '2025-07-25T18:00:00Z',
    endDate: '2025-07-26T02:00:00Z',
    location: '인천광역시 송도국제도시 센트럴파크',
    cast: ['David Guetta', 'Armin van Buuren', '페길'],
    crew: ['DJ Snake', 'Marshmello'],
    runtime: '480분',
    age: '만 19세 이상',
    productionCompany: ['인천문화재단'],
    agency: ['EDM코리아'],
    host: ['인천광역시'],
    organizer: ['인천EDM페스티벌조직위'],
    price: ['1일권 150,000원', '2일권 250,000원'],
    poster: 'https://picsum.photos/seed/edm/400/600',
    state: '예정',
    visit: '내한',
    images: [
      {
        id: 'img-1101',
        src: 'https://picsum.photos/seed/edm1/800/600',
        alt: 'EDM 페스티벌 야경',
      },
    ],
    time: ['금요일(18:00)', '토요일(18:00)'],
    groupCount: 42,
    favoriteCount: 11800,
    isLiked: false,
  },
  {
    id: 'pf-20251107',
    title: '국립극장 <춘향전>',
    startDate: '2025-09-20T19:00:00Z',
    endDate: '2025-09-25T21:00:00Z',
    location: '서울특별시 국립극장 해오름극장',
    cast: ['송강호', '김혜수', '류승룡'],
    crew: ['이준익', '김태윤'],
    runtime: '120분',
    age: '만 12세 이상',
    productionCompany: ['국립극장'],
    agency: ['국립극장'],
    host: ['문화체육관광부'],
    organizer: ['국립극장'],
    price: ['R석 50,000원', 'S석 30,000원'],
    poster: 'https://picsum.photos/seed/chunhyang/400/600',
    state: '예정',
    visit: '국내',
    images: [
      {
        id: 'img-1201',
        src: 'https://picsum.photos/seed/chunhyang1/800/600',
        alt: '춘향전 무대',
      },
    ],
    time: ['화요일 ~ 토요일(19:00)', '일요일(15:00)'],
    groupCount: 18,
    favoriteCount: 4200,
    isLiked: false,
  },
  {
    id: 'pf-20251108',
    title: 'NewJeans 팬미팅',
    startDate: '2025-06-28T18:00:00Z',
    endDate: '2025-06-29T20:30:00Z',
    location: '서울특별시 올림픽공원 체조경기장',
    cast: ['NewJeans'],
    crew: ['Min Hee-jin', '250'],
    runtime: '150분',
    age: '전체 관람가',
    productionCompany: ['어도어'],
    state: '예정',

    agency: ['하이브'],
    host: ['어도어'],
    organizer: ['어도어'],
    price: ['스탠딩 132,000원', 'VIP 187,000원'],
    poster: '',
    isLiked: false,
    visit: '',
    time: [],
    groupCount: 0,
    favoriteCount: 0,
  },
];

interface SearchParams {
  keyword?: string;
  category?: string;
  date?: string;
  location?: string;
  sort?: string;

  page?: number;
  size?: number;
}

const filterPerformances = (
  performances: Performance[],
  params: SearchParams
) => {
  let filtered = [...performances];

  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filtered = filtered.filter(
      (perf) =>
        perf.title.toLowerCase().includes(keyword)
        || perf.location.toLowerCase().includes(keyword)
        || perf.cast.some((actor: string) =>
          actor.toLowerCase().includes(keyword)
        )
    );
  }

  if (params.category) {
    const category = params.category.toLowerCase();
    filtered = filtered.filter((perf) => {
      const title = perf.title.toLowerCase();
      switch (category) {
        case '뮤지컬':
          return title.includes('뮤지컬');
        case '콘서트':
          return title.includes('콘서트') || title.includes('페스티벌');
        case '연극':
          return title.includes('연극');
        case '클래식':
          return (
            title.includes('클래식')
            || title.includes('오케스트라')
            || title.includes('발레')
          );
        default:
          return true;
      }
    });
  }

  if (params.date) {
    const filterDate = new Date(params.date);
    filtered = filtered.filter((perf) => {
      const startDate = new Date(perf.startDate);
      const endDate = new Date(perf.endDate);
      return filterDate >= startDate && filterDate <= endDate;
    });
  }

  if (params.location) {
    const location = params.location;
    filtered = filtered.filter((perf) => perf.location.includes(location));
  }

  return filtered;
};

const sortPerformances = (performances: Performance[], sortBy: string) => {
  const sorted = [...performances];

  switch (sortBy) {
    case 'date':
      return sorted.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    case 'popularity':
      return sorted.sort((a, b) => b.favoriteCount - a.favoriteCount);
    case 'groups':
      return sorted.sort((a, b) => b.groupCount - a.groupCount);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

const paginateResults = (data: Performance[], page = 1, size = 20) => {
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    page: page,
    size: size,
    totalElements: data.length,
    totalPages: Math.ceil(data.length / size),
    first: page === 1,
    last: page === Math.ceil(data.length / size) || data.length === 0,
  };
};

export const performancesHandlers = [
  http.get('http://localhost:3000/api/v1/performances/top-favorites', () =>
    HttpResponse.json(TOP_FAVORITES_SAMPLE_DATA)
  ),
  http.get('http://localhost:3000/api/v1/performances/top-groups', () =>
    HttpResponse.json(TOP_GROUPS_SAMPLE_DATA)
  ),

  http.get('http://localhost:3000/api/v1/performances', ({ request }) => {
    const url = new URL(request.url);
    const params = {
      keyword: url.searchParams.get('keyword') ?? undefined,
      category: url.searchParams.get('category') ?? undefined,
      date: url.searchParams.get('date') ?? undefined,
      location: url.searchParams.get('location') ?? undefined,
      sort: url.searchParams.get('sort') ?? undefined,
      page: parseInt(url.searchParams.get('page') ?? '1'),
      size: parseInt(url.searchParams.get('size') ?? '20'),
    };

    try {
      // 필터링
      let filteredPerformances = filterPerformances(
        FULL_PERFORMANCES_DATA,
        params
      );

      // 정렬
      if (params.sort) {
        filteredPerformances = sortPerformances(
          filteredPerformances,
          params.sort
        );
      }

      // 페이지네이션
      const result = paginateResults(
        filteredPerformances,
        params.page,
        params.size
      );

      const response = {
        code: 200,
        message: '요청이 성공적으로 처리되었습니다.',
        ...result,
      };

      console.log('공연 검색 응답:', {
        totalElements: result.totalElements,
        page: result.page,
        size: result.size,
        totalPages: result.totalPages,
      }); // 디버깅용

      // 검색 결과가 없을 때
      if (filteredPerformances.length === 0) {
        return HttpResponse.json({
          code: 200,
          message: '검색 결과가 없습니다.',
          data: [],
          page: 1,
          size: params.size,
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
        });
      }

      return HttpResponse.json(response);
    } catch (error) {
      console.error('공연 검색 오류:', error);
      return HttpResponse.json(
        {
          code: 500,
          message: '서버 오류가 발생했습니다.',
          data: [],
          page: 1,
          size: params.size,
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
        },
        { status: 500 }
      );
    }
  }),
];
