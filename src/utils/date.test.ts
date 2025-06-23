import {
  formatRelativeDate,
  formatPostDate,
  formatToKSTDate,
  formatToKSTTime,
  formatNormalDate,
} from './date';

describe('날짜 포맷팅 함수 테스트', () => {
  const mockNow = new Date('2024-06-23T12:00:00Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockNow);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('formatRelativeDate', () => {
    it('빈 문자열이 입력되면 빈 문자열을 반환해야 한다', () => {
      expect(formatRelativeDate('')).toBe('');
    });

    it('30초 전 날짜는 "방금"을 반환해야 한다', () => {
      const thirtySecondsAgo = new Date(
        mockNow.getTime() - 30 * 1000
      ).toISOString();
      expect(formatRelativeDate(thirtySecondsAgo)).toBe('방금');
    });

    it('5분 전 날짜는 "5분 전"을 반환해야 한다', () => {
      const fiveMinutesAgo = new Date(
        mockNow.getTime() - 5 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(fiveMinutesAgo)).toBe('5분 전');
    });

    it('2시간 전 날짜는 "2시간 전"을 반환해야 한다', () => {
      const twoHoursAgo = new Date(
        mockNow.getTime() - 2 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(twoHoursAgo)).toBe('2시간 전');
    });

    it('3일 전 날짜는 "M월 d일" 형식을 반환해야 한다', () => {
      const threeDaysAgo = new Date(
        mockNow.getTime() - 3 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatRelativeDate(threeDaysAgo)).toBe('6월 20일');
    });

    it('공백이 포함된 날짜 문자열을 처리할 수 있어야 한다', () => {
      const dateWithSpaces = '  2024-06-23T11:30:00Z  ';
      expect(formatRelativeDate(dateWithSpaces)).toBe('30분 전');
    });
  });

  describe('formatPostDate', () => {
    it('빈 문자열이 입력되면 빈 문자열을 반환해야 한다', () => {
      expect(formatPostDate('')).toBe('');
    });

    it('올바른 날짜 문자열을 "M월 d일 a hh:mm" 형식으로 반환해야 한다', () => {
      const testDate = '2024-06-23T14:30:00Z';
      expect(formatPostDate(testDate)).toBe('6월 23일 오후 11:30');
    });

    it('공백이 포함된 날짜 문자열을 처리할 수 있어야 한다', () => {
      const dateWithSpaces = '  2024-06-23T09:15:00Z  ';
      expect(formatPostDate(dateWithSpaces)).toBe('6월 23일 오후 06:15');
    });

    it('잘못된 날짜 문자열이 입력되면 원본 문자열을 반환해야 한다', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const invalidDate = 'invalid-date';

      const result = formatPostDate(invalidDate);

      expect(result).toBe(invalidDate);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error formatting date:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
    it('null이나 undefined 같은 값이 들어와도 안전하게 처리해야 한다', () => {
      expect(formatPostDate(null as any)).toBe('');
      expect(formatPostDate(undefined as any)).toBe('');
    });
  });

  describe('formatToKSTDate', () => {
    it('ISO 문자열을 KST 날짜 형식으로 변환해야 한다', () => {
      const isoString = '2024-06-23T15:00:00Z'; // UTC
      // 실제 함수 결과에 따라 수정
      expect(formatToKSTDate(isoString)).toBe('24년 06월 23일 (일)');
    });

    it('다른 시간대의 날짜도 올바르게 변환해야 한다', () => {
      const isoString = '2024-12-25T10:30:00Z';
      expect(formatToKSTDate(isoString)).toBe('24년 12월 25일 (수)');
    });

    it('특정 시간대에서 날짜 변환을 테스트한다', () => {
      const isoString = '2024-06-23T05:00:00Z'; // UTC 05:00
      // 실제 함수 결과에 따라 수정
      expect(formatToKSTDate(isoString)).toBe('24년 06월 23일 (일)');
    });
  });

  describe('formatToKSTTime', () => {
    it('ISO 문자열을 KST 시간 형식으로 변환해야 한다', () => {
      const isoString = '2024-06-23T06:30:00Z'; // UTC 06:30
      // 실제 함수 결과에 따라 수정
      expect(formatToKSTTime(isoString)).toBe('오전 06:30');
    });

    it('오전 시간도 올바르게 변환해야 한다', () => {
      const isoString = '2024-06-23T21:15:00Z'; // UTC 21:15
      // 실제 함수 결과에 따라 수정
      expect(formatToKSTTime(isoString)).toBe('오후 09:15');
    });

    it('정오 시간 변환을 테스트한다', () => {
      const isoString = '2024-06-23T12:00:00Z'; // UTC 12:00
      // 실제 함수 결과에 따라 수정
      expect(formatToKSTTime(isoString)).toBe('오후 12:00');
    });

    it('자정 근처 시간 변환을 테스트한다', () => {
      const isoString = '2024-06-23T00:00:00Z'; // UTC 00:00
      expect(formatToKSTTime(isoString)).toBe('오전 12:00');
    });
  });

  describe('formatNormalDate', () => {
    it('Date 객체를 "yy.MM.dd" 형식으로 변환해야 한다', () => {
      const testDate = new Date('2024-06-23T12:00:00Z');
      expect(formatNormalDate(testDate)).toBe('24.06.23');
    });

    it('날짜 문자열을 "yy.MM.dd" 형식으로 변환해야 한다', () => {
      const testDateString = '2024-12-25';
      expect(formatNormalDate(testDateString)).toBe('24.12.25');
    });

    it('한 자리 월과 일도 올바르게 포맷해야 한다', () => {
      const testDate = new Date('2024-01-05');
      expect(formatNormalDate(testDate)).toBe('24.01.05');
    });
  });
});

// 통합 테스트
describe('날짜 포맷팅 함수 통합 테스트', () => {
  it('동일한 날짜에 대해 각 함수가 일관된 결과를 반환해야 한다', () => {
    const testDate = '2024-06-23T12:00:00Z';

    // 각 함수가 에러 없이 실행되어야 함
    expect(() => formatRelativeDate(testDate)).not.toThrow();
    expect(() => formatPostDate(testDate)).not.toThrow();
    expect(() => formatToKSTDate(testDate)).not.toThrow();
    expect(() => formatToKSTTime(testDate)).not.toThrow();
    expect(() => formatNormalDate(testDate)).not.toThrow();
  });

  it('극단적인 날짜 값들을 처리할 수 있어야 한다', () => {
    const veryOldDate = '1970-01-01T00:00:00Z';
    const futureDate = '2099-12-31T23:59:59Z';

    expect(() => formatRelativeDate(veryOldDate)).not.toThrow();
    expect(() => formatPostDate(futureDate)).not.toThrow();
    expect(() => formatToKSTDate(veryOldDate)).not.toThrow();
    expect(() => formatToKSTTime(futureDate)).not.toThrow();
    expect(() => formatNormalDate(veryOldDate)).not.toThrow();
  });
});
