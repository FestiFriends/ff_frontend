import { MultiLevelData } from '@/hooks/useMultiLevelFilter/useMultiLevelFilter';

export const regionFilterData: MultiLevelData[] = [
  {
    label: '서울특별시',
    value: 'seoul',
    children: [
      {
        label: '강남구',
        value: 'gangnam',
        children: [
          {
            label: '역삼동',
            value: 'yeoksam',
          },
          {
            label: '논현동',
            value: 'nonhyeon',
          },
          {
            label: '청담동',
            value: 'cheongdam',
          },
        ],
      },
      {
        label: '마포구',
        value: 'mapo',
        children: [
          {
            label: '서교동',
            value: 'seogyo',
          },
          {
            label: '합정동',
            value: 'hapjeong',
          },
          {
            label: '망원동',
            value: 'mangwon',
          },
        ],
      },
      {
        label: '종로구',
        value: 'jongno',
        children: [
          {
            label: '사직동',
            value: 'sajik',
          },
          {
            label: '삼청동',
            value: 'samcheong',
          },
          {
            label: '혜화동',
            value: 'hyehwa',
          },
        ],
      },
    ],
  },
  {
    label: '인천광역시',
    value: 'incheon',
    children: [
      {
        label: '연수구',
        value: 'yeonsu',
        children: [
          {
            label: '송도동',
            value: 'songdo',
          },
          {
            label: '연수동',
            value: 'yeonsu1',
          },
          {
            label: '동춘동',
            value: 'dongchun',
          },
        ],
      },
      {
        label: '남동구',
        value: 'namdong',
        children: [
          {
            label: '구월동',
            value: 'guwol',
          },
          {
            label: '간석동',
            value: 'gansuk',
          },
          {
            label: '논현동',
            value: 'nonhyeon_ic',
          },
        ],
      },
      {
        label: '미추홀구',
        value: 'michuhol',
        children: [
          {
            label: '주안동',
            value: 'juan',
          },
          {
            label: '관교동',
            value: 'gwangyo',
          },
          {
            label: '도화동',
            value: 'dohwa',
          },
        ],
      },
    ],
  },
  {
    label: '경기도',
    value: 'gyeonggi',
    children: [
      {
        label: '수원시',
        value: 'suwon',
        children: [
          {
            label: '영통구',
            value: 'yeongtong',
          },
          {
            label: '팔달구',
            value: 'paldal',
          },
          {
            label: '장안구',
            value: 'jangan',
          },
        ],
      },
      {
        label: '성남시',
        value: 'seongnam',
        children: [
          {
            label: '분당구',
            value: 'bundang',
          },
          {
            label: '수정구',
            value: 'sujeong',
          },
          {
            label: '중원구',
            value: 'jungwon',
          },
        ],
      },
      {
        label: '고양시',
        value: 'goyang',
        children: [
          {
            label: '일산서구',
            value: 'ilsanseo',
          },
          {
            label: '일산동구',
            value: 'ilsandong',
          },
          {
            label: '덕양구',
            value: 'deogyang',
          },
        ],
      },
    ],
  },
  {
    label: '강원특별자치도',
    value: 'gangwon',
    children: [
      {
        label: '춘천시',
        value: 'chuncheon',
        children: [
          {
            label: '석사동',
            value: 'seoksa',
          },
          {
            label: '후평동',
            value: 'hupyeong',
          },
          {
            label: '퇴계동',
            value: 'toegye',
          },
        ],
      },
      {
        label: '원주시',
        value: 'wonju',
        children: [
          {
            label: '단구동',
            value: 'dangu',
          },
          {
            label: '무실동',
            value: 'musil',
          },
          {
            label: '명륜동',
            value: 'myeongnyun',
          },
        ],
      },
      {
        label: '강릉시',
        value: 'gangneung',
        children: [
          {
            label: '교동',
            value: 'gyo',
          },
          {
            label: '포남동',
            value: 'ponam',
          },
          {
            label: '옥천동',
            value: 'okcheon',
          },
        ],
      },
    ],
  },
  {
    label: '세종특별자치시',
    value: 'sejong',
    children: [
      {
        label: '한솔동',
        value: 'hansol',
        children: [
          {
            label: '첫마을1단지',
            value: 'apt1',
          },
          {
            label: '첫마을2단지',
            value: 'apt2',
          },
          {
            label: '첫마을3단지',
            value: 'apt3',
          },
        ],
      },
      {
        label: '도담동',
        value: 'dodam',
        children: [
          {
            label: '도램마을1단지',
            value: 'doraem1',
          },
          {
            label: '도램마을2단지',
            value: 'doraem2',
          },
          {
            label: '도램마을3단지',
            value: 'doraem3',
          },
        ],
      },
      {
        label: '아름동',
        value: 'areum',
        children: [
          {
            label: '아름마을1단지',
            value: 'areum1',
          },
          {
            label: '아름마을2단지',
            value: 'areum2',
          },
          {
            label: '아름마을3단지',
            value: 'areum3',
          },
        ],
      },
    ],
  },
  {
    label: '대전광역시',
    value: 'daejeon',
    children: [
      {
        label: '서구',
        value: 'seogu_dj',
        children: [
          {
            label: '둔산동',
            value: 'dunsan',
          },
          {
            label: '월평동',
            value: 'wolpyeong',
          },
          {
            label: '탄방동',
            value: 'tanbang',
          },
        ],
      },
      {
        label: '유성구',
        value: 'yuseong',
        children: [
          {
            label: '봉명동',
            value: 'bongmyeong',
          },
          {
            label: '장대동',
            value: 'jangdae',
          },
          {
            label: '노은동',
            value: 'noeun',
          },
        ],
      },
      {
        label: '동구',
        value: 'donggu_dj',
        children: [
          {
            label: '신인동',
            value: 'shinin',
          },
          {
            label: '용운동',
            value: 'yongun',
          },
          {
            label: '가양동',
            value: 'gayang',
          },
        ],
      },
    ],
  },
  {
    label: '충청북도',
    value: 'chungbuk',
    children: [
      {
        label: '청주시',
        value: 'cheongju',
        children: [
          {
            label: '흥덕구',
            value: 'heungdeok',
          },
          {
            label: '상당구',
            value: 'sangdang',
          },
          {
            label: '서원구',
            value: 'seowon',
          },
        ],
      },
      {
        label: '충주시',
        value: 'chungju',
        children: [
          {
            label: '교현동',
            value: 'gyohyeon',
          },
          {
            label: '용산동',
            value: 'yongsan',
          },
          {
            label: '연수동',
            value: 'yeonsu_cb',
          },
        ],
      },
      {
        label: '제천시',
        value: 'jecheon',
        children: [
          {
            label: '하소동',
            value: 'haso',
          },
          {
            label: '청전동',
            value: 'cheongjeon',
          },
          {
            label: '장락동',
            value: 'jangrak',
          },
        ],
      },
    ],
  },
  {
    label: '충청남도',
    value: 'chungnam',
    children: [
      {
        label: '천안시',
        value: 'cheonan',
        children: [
          {
            label: '불당동',
            value: 'buldang',
          },
          {
            label: '쌍용동',
            value: 'ssangyong',
          },
          {
            label: '신부동',
            value: 'shinbu',
          },
        ],
      },
      {
        label: '아산시',
        value: 'asan',
        children: [
          {
            label: '온천동',
            value: 'oncheon',
          },
          {
            label: '배방읍',
            value: 'baebang',
          },
          {
            label: '탕정면',
            value: 'tangjeong',
          },
        ],
      },
      {
        label: '공주시',
        value: 'gongju',
        children: [
          {
            label: '금성동',
            value: 'geumseong',
          },
          {
            label: '중학동',
            value: 'junghak',
          },
          {
            label: '웅진동',
            value: 'ungjin',
          },
        ],
      },
    ],
  },
  {
    label: '대구광역시',
    value: 'daegu',
    children: [
      {
        label: '수성구',
        value: 'suseong',
        children: [
          {
            label: '범어동',
            value: 'beomeo',
          },
          {
            label: '만촌동',
            value: 'manchon',
          },
          {
            label: '두산동',
            value: 'dusan',
          },
        ],
      },
      {
        label: '달서구',
        value: 'dalseo',
        children: [
          {
            label: '성당동',
            value: 'seongdang',
          },
          {
            label: '본리동',
            value: 'bonri',
          },
          {
            label: '상인동',
            value: 'sangin',
          },
        ],
      },
      {
        label: '북구',
        value: 'bukgu',
        children: [
          {
            label: '산격동',
            value: 'sangyeok',
          },
          {
            label: '복현동',
            value: 'bokhyeon',
          },
          {
            label: '침산동',
            value: 'chimsan',
          },
        ],
      },
    ],
  },
  {
    label: '울산광역시',
    value: 'ulsan',
    children: [
      {
        label: '남구',
        value: 'namgu_us',
        children: [
          {
            label: '삼산동',
            value: 'samsan',
          },
          {
            label: '달동',
            value: 'dal',
          },
          {
            label: '신정동',
            value: 'sinjeong',
          },
        ],
      },
      {
        label: '중구',
        value: 'junggu_us',
        children: [
          {
            label: '성남동',
            value: 'seongnam',
          },
          {
            label: '학성동',
            value: 'hakseong',
          },
          {
            label: '우정동',
            value: 'ujeong',
          },
        ],
      },
      {
        label: '북구',
        value: 'bukgu_us',
        children: [
          {
            label: '화봉동',
            value: 'hwabong',
          },
          {
            label: '송정동',
            value: 'songjeong',
          },
          {
            label: '연암동',
            value: 'yeonam',
          },
        ],
      },
    ],
  },
  {
    label: '부산광역시',
    value: 'busan',
    children: [
      {
        label: '해운대구',
        value: 'haeundae',
        children: [
          {
            label: '우동',
            value: 'udong',
          },
          {
            label: '좌동',
            value: 'jwadong',
          },
          {
            label: '중동',
            value: 'jungdong',
          },
        ],
      },
      {
        label: '수영구',
        value: 'suyeong',
        children: [
          {
            label: '광안동',
            value: 'gwangan',
          },
          {
            label: '남천동',
            value: 'namcheon',
          },
          {
            label: '망미동',
            value: 'mangmi',
          },
        ],
      },
      {
        label: '중구',
        value: 'junggu',
        children: [
          {
            label: '동광동',
            value: 'donggwang',
          },
          {
            label: '중앙동',
            value: 'jungang',
          },
          {
            label: '남포동',
            value: 'nampo',
          },
        ],
      },
    ],
  },
  {
    label: '제주특별자치도',
    value: 'jeju',
    children: [
      {
        label: '제주시',
        value: 'jeju_city',
        children: [
          {
            label: '이도이동',
            value: 'ido2',
          },
          {
            label: '연동',
            value: 'yeondong',
          },
          {
            label: '노형동',
            value: 'nohyeong',
          },
        ],
      },
      {
        label: '서귀포시',
        value: 'seogwipo',
        children: [
          {
            label: '중문동',
            value: 'jungmun',
          },
          {
            label: '대정읍',
            value: 'daejeong',
          },
          {
            label: '안덕면',
            value: 'andeok',
          },
        ],
      },
    ],
  },
  {
    label: '광주광역시',
    value: 'gwangju',
    children: [
      {
        label: '동구',
        value: 'donggu_gj',
        children: [
          {
            label: '충장동',
            value: 'chungjang',
          },
          {
            label: '계림동',
            value: 'gyerim',
          },
          {
            label: '지산동',
            value: 'jisan',
          },
        ],
      },
      {
        label: '서구',
        value: 'seogu_gj',
        children: [
          {
            label: '화정동',
            value: 'hwajeong',
          },
          {
            label: '상무동',
            value: 'sangmu',
          },
          {
            label: '쌍촌동',
            value: 'ssangchon',
          },
        ],
      },
      {
        label: '북구',
        value: 'bukgu_gj',
        children: [
          {
            label: '운암동',
            value: 'unam',
          },
          {
            label: '일곡동',
            value: 'ilgok',
          },
          {
            label: '두암동',
            value: 'duam',
          },
        ],
      },
    ],
  },
];
