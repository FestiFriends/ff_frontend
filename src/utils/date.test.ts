import {
  formatRelativeDate,
  formatPostDate,
  formatNormalDate,
  formatToKST,
  formatScheduleDate,
} from './date';

const MOCK_DATE = new Date('2024-03-15T12:00:00Z');

describe('Date Utils', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_DATE);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('formatRelativeDate', () => {
    it('방금 전 시간을 올바르게 표시해야 한다', () => {
      const now = new Date().toISOString();
      expect(formatRelativeDate(now)).toBe('방금');
    });

    it('30초 전은 방금으로 표시해야 한다', () => {
      const thirtySecondsAgo = new Date(Date.now() - 30 * 1000).toISOString();
      expect(formatRelativeDate(thirtySecondsAgo)).toBe('방금');
    });

    it('분 단위 상대 시간을 올바르게 표시해야 한다', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      expect(formatRelativeDate(fiveMinutesAgo)).toBe('5분 전');

      const thirtyMinutesAgo = new Date(
        Date.now() - 30 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(thirtyMinutesAgo)).toBe('30분 전');

      const fiftyNineMinutesAgo = new Date(
        Date.now() - 59 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(fiftyNineMinutesAgo)).toBe('59분 전');
    });

    it('시간 단위 상대 시간을 올바르게 표시해야 한다', () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      expect(formatRelativeDate(oneHourAgo)).toBe('1시간 전');

      const twoHoursAgo = new Date(
        Date.now() - 2 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(twoHoursAgo)).toBe('2시간 전');

      const twentyThreeHoursAgo = new Date(
        Date.now() - 23 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(twentyThreeHoursAgo)).toBe('23시간 전');
    });

    it('하루 이상 된 날짜는 M월 d일 형식으로 표시해야 한다', () => {
      const oneDayAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(oneDayAgo)).toBe('3월 14일');

      const threeDaysAgo = new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(threeDaysAgo)).toBe('3월 12일');
    });

    it('미래 날짜는 음수 처리로 인해 "방금"으로 표시된다', () => {
      const futureDate = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(futureDate)).toBe('방금');
    });

    it('빈 문자열은 빈 문자열을 반환해야 한다', () => {
      expect(formatRelativeDate('')).toBe('');
    });

    it('null이나 undefined는 빈 문자열을 반환해야 한다', () => {
      expect(formatRelativeDate(null)).toBe('');
      expect(formatRelativeDate(undefined)).toBe('');
    });

    it('공백만 있는 문자열은 parseISO로 처리되어 에러를 발생시킨다', () => {
      expect(() => formatRelativeDate('   ')).toThrow('Invalid time value');
    });
  });

  describe('formatPostDate', () => {
    it('올바른 게시물 날짜 형식을 반환해야 한다 (KST 시간대 적용)', () => {
      const testDate = '2024-03-15T14:30:00Z';
      expect(formatPostDate(testDate)).toBe('3월 15일 오후 11:30');
    });

    it('오전 시간을 올바르게 표시해야 한다 (KST 시간대 적용)', () => {
      const morningDate = '2024-03-15T02:15:00Z';
      expect(formatPostDate(morningDate)).toBe('3월 15일 오전 11:15');
    });

    it('정오를 올바르게 표시해야 한다 (KST 시간대 적용)', () => {
      const noonDate = '2024-03-15T12:00:00Z';
      expect(formatPostDate(noonDate)).toBe('3월 15일 오후 09:00');
    });

    it('자정을 올바르게 표시해야 한다 (KST 시간대 적용)', () => {
      const midnightDate = '2024-03-15T00:00:00Z';
      expect(formatPostDate(midnightDate)).toBe('3월 15일 오전 09:00');
    });

    it('빈 문자열은 빈 문자열을 반환해야 한다', () => {
      expect(formatPostDate('')).toBe('');
    });

    it('null이나 undefined는 빈 문자열을 반환해야 한다', () => {
      expect(formatPostDate(null)).toBe('');
      expect(formatPostDate(undefined)).toBe('');
    });

    it('잘못된 날짜 형식은 원본 문자열을 반환해야 한다', () => {
      const invalidDate = 'invalid-date-string';
      expect(formatPostDate(invalidDate)).toBe(invalidDate);
    });

    it('부분적으로 잘못된 ISO 문자열도 원본을 반환해야 한다', () => {
      const partiallyInvalid = '2024-13-45T25:70:80Z';
      expect(formatPostDate(partiallyInvalid)).toBe(partiallyInvalid);
    });
  });

  describe('formatNormalDate', () => {
    it('문자열 날짜를 yy.MM.dd 형식으로 변환해야 한다', () => {
      expect(formatNormalDate('2024-03-15')).toBe('24.03.15');
      expect(formatNormalDate('2024-12-25')).toBe('24.12.25');
      expect(formatNormalDate('2023-01-01')).toBe('23.01.01');
    });

    it('Date 객체를 yy.MM.dd 형식으로 변환해야 한다', () => {
      const date = new Date('2024-03-15');
      expect(formatNormalDate(date)).toBe('24.03.15');
    });

    it('ISO 문자열을 yy.MM.dd 형식으로 변환해야 한다', () => {
      expect(formatNormalDate('2024-03-15T14:30:00Z')).toBe('24.03.15');
    });

    it('잘못된 날짜는 Invalid Date 처리로 인해 예외가 발생할 수 있다', () => {
      expect(() => formatNormalDate('invalid-date')).toThrow();
    });
  });

  describe('formatToKST', () => {
    it('UTC 시간을 KST 타임스탬프로 변환해야 한다 (원본 로직 - 9시간 빼기)', () => {
      const utcDate = '2024-03-15T12:00:00Z';
      const result = formatToKST(utcDate);

      const expectedTimestamp =
        new Date(utcDate).getTime() - 9 * 60 * 60 * 1000;
      expect(result).toBe(expectedTimestamp);
    });

    it('다른 시간대 문자열도 처리해야 한다', () => {
      const date = '2024-03-15T21:00:00+09:00'; // KST 시간
      const result = formatToKST(date);

      const expectedTimestamp = new Date(date).getTime() - 9 * 60 * 60 * 1000;
      expect(result).toBe(expectedTimestamp);
    });

    it('잘못된 날짜 문자열은 NaN을 반환한다', () => {
      const result = formatToKST('invalid-date');
      expect(isNaN(result)).toBe(true);
    });
  });

  describe('formatScheduleDate', () => {
    it('날짜와 시간을 조합하여 ISO 문자열을 생성해야 한다', () => {
      const date = new Date('2024-03-15T00:00:00Z');
      const time = new Date('2024-01-01T14:30:00Z');

      const result = formatScheduleDate(date, time);
      expect(result).toBe('2024-03-15T23:30:00+09:00');
    });

    it('다른 날짜와 시간 조합도 올바르게 처리해야 한다', () => {
      const date = new Date('2024-12-25T10:20:30Z');
      const time = new Date('2023-06-15T09:45:12Z');

      const result = formatScheduleDate(date, time);
      expect(result).toBe('2024-12-25T18:45:12+09:00');
    });

    it('자정 시간을 올바르게 처리해야 한다', () => {
      const date = new Date('2024-03-15T12:34:56Z');
      const time = new Date('2024-01-01T00:00:00Z');

      const result = formatScheduleDate(date, time);
      expect(result).toBe('2024-03-15T09:00:00+09:00');
    });

    it('밀리초가 포함된 시간도 처리해야 한다', () => {
      const date = new Date('2024-03-15T00:00:00Z');
      const time = new Date('2024-01-01T14:30:45.123Z');

      const result = formatScheduleDate(date, time);
      expect(result).toBe('2024-03-15T23:30:45+09:00');
    });
  });

  describe('엣지 케이스 및 경계값 테스트', () => {
    describe('formatRelativeDate 경계값', () => {
      it('정확히 59초는 방금으로 표시', () => {
        const fiftyNineSecondsAgo = new Date(
          Date.now() - 59 * 1000
        ).toISOString();
        expect(formatRelativeDate(fiftyNineSecondsAgo)).toBe('방금');
      });

      it('정확히 60초(1분)는 1분 전으로 표시', () => {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
        expect(formatRelativeDate(oneMinuteAgo)).toBe('1분 전');
      });

      it('정확히 3599초는 59분 전으로 표시', () => {
        const fiftyNineMinutesAgo = new Date(
          Date.now() - 3599 * 1000
        ).toISOString();
        expect(formatRelativeDate(fiftyNineMinutesAgo)).toBe('59분 전');
      });

      it('정확히 3600초(1시간)는 1시간 전으로 표시', () => {
        const oneHourAgo = new Date(Date.now() - 3600 * 1000).toISOString();
        expect(formatRelativeDate(oneHourAgo)).toBe('1시간 전');
      });

      it('정확히 86399초는 23시간 전으로 표시', () => {
        const twentyThreeHoursAgo = new Date(
          Date.now() - 86399 * 1000
        ).toISOString();
        expect(formatRelativeDate(twentyThreeHoursAgo)).toBe('23시간 전');
      });

      it('정확히 86400초(24시간)는 날짜 형식으로 표시', () => {
        const oneDayAgo = new Date(Date.now() - 86400 * 1000).toISOString();
        expect(formatRelativeDate(oneDayAgo)).toBe('3월 14일');
      });
    });

    describe('다양한 날짜 형식 테스트', () => {
      it('ISO 문자열 다양한 형태 처리', () => {
        expect(() => formatPostDate('2024-03-15T14:30:00.000Z')).not.toThrow();
        expect(() => formatPostDate('2024-03-15T14:30:00+09:00')).not.toThrow();
        expect(() => formatPostDate('2024-03-15T14:30:00-05:00')).not.toThrow();
      });

      it('연도 경계값 테스트', () => {
        expect(formatNormalDate('2000-01-01')).toBe('00.01.01');
        expect(formatNormalDate('1999-12-31')).toBe('99.12.31');
        expect(formatNormalDate('2099-12-31')).toBe('99.12.31');
      });
    });
  });

  describe('성능 테스트', () => {
    it('formatRelativeDate 대량 처리 성능', () => {
      const dates = Array.from({ length: 1000 }, (_, i) =>
        new Date(Date.now() - i * 60 * 1000).toISOString()
      );

      const start = performance.now();
      dates.forEach((date) => formatRelativeDate(date));
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // 100ms 이내
    });

    it('formatPostDate 대량 처리 성능', () => {
      const dates = Array.from({ length: 1000 }, (_, i) =>
        new Date(Date.now() - i * 60 * 1000).toISOString()
      );

      const start = performance.now();
      dates.forEach((date) => formatPostDate(date));
      const end = performance.now();

      expect(end - start).toBeLessThan(200); // 200ms 이내
    });
  });

  describe('실제 사용 케이스 시나리오', () => {
    it('SNS 게시물 시간 표시 시나리오', () => {
      const now = new Date();

      const justNow = new Date(now.getTime() - 30 * 1000).toISOString();
      expect(formatRelativeDate(justNow)).toBe('방금');

      const fiveMin = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
      expect(formatRelativeDate(fiveMin)).toBe('5분 전');

      const twoHours = new Date(
        now.getTime() - 2 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(twoHours)).toBe('2시간 전');

      const threeDays = new Date(
        now.getTime() - 3 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(threeDays)).toMatch(/\d+월 \d+일/);
    });

    it('일정 생성 시나리오', () => {
      const meetingDate = new Date('2024-03-20T00:00:00Z');
      const meetingTime = new Date('2024-01-01T14:30:00Z');

      const scheduleISO = formatScheduleDate(meetingDate, meetingTime);
      expect(scheduleISO).toBe('2024-03-20T23:30:00+09:00');

      expect(formatPostDate(scheduleISO)).toMatch(/3월 21일|3월 20일/);
    });
  });
});
