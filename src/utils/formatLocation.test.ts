import { formatLocation } from './formatLocation';
import { LocationLabels } from '@/constants/locationLabels';

// Mock the LocationLabels constant
jest.mock('@/constants/locationLabels', () => ({
  LocationLabels: {
    'SEOUL': '서울',
    'BUSAN': '부산',
    'DAEGU': '대구',
    'INCHEON': '인천',
    'GWANGJU': '광주',
    'DAEJEON': '대전',
    'ULSAN': '울산',
    'SEJONG': '세종',
    'GYEONGGI': '경기',
    'GANGWON': '강원',
    'CHUNGBUK': '충북',
    'CHUNGNAM': '충남',
    'JEONBUK': '전북',
    'JEONNAM': '전남',
    'GYEONGBUK': '경북',
    'GYEONGNAM': '경남',
    'JEJU': '제주',
  },
}));

describe('formatLocation', () => {
  describe('valid location format', () => {
    it('should parse valid location with known region code', () => {
      const result = formatLocation('SEOUL/잠실체육관');
      
      expect(result).toEqual({
        location: '서울',
        place: '잠실체육관',
      });
    });

    it('should parse location with multiple known region codes', () => {
      const testCases = [
        { input: 'BUSAN/벡스코', expected: { location: '부산', place: '벡스코' } },
        { input: 'DAEGU/대구콘서트하우스', expected: { location: '대구', place: '대구콘서트하우스' } },
        { input: 'GYEONGGI/일산킨텍스', expected: { location: '경기', place: '일산킨텍스' } },
        { input: 'JEJU/제주컨벤션센터', expected: { location: '제주', place: '제주컨벤션센터' } },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(formatLocation(input)).toEqual(expected);
      });
    });

    it('should handle unknown region codes', () => {
      const result = formatLocation('UNKNOWN_REGION/테스트장소');
      
      expect(result).toEqual({
        location: 'UNKNOWN_REGION',
        place: '테스트장소',
      });
    });

    it('should handle place names with special characters', () => {
      const result = formatLocation('SEOUL/잠실체육관(보조경기장)');
      
      expect(result).toEqual({
        location: '서울',
        place: '잠실체육관(보조경기장)',
      });
    });

    it('should handle place names with spaces', () => {
      const result = formatLocation('SEOUL/올림픽 공원');
      
      expect(result).toEqual({
        location: '서울',
        place: '올림픽 공원',
      });
    });

    it('should handle place names with numbers', () => {
      const result = formatLocation('SEOUL/제1체육관');
      
      expect(result).toEqual({
        location: '서울',
        place: '제1체육관',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined input', () => {
      const result = formatLocation(undefined);
      
      expect(result).toEqual({
        location: '',
        place: '',
      });
    });

    it('should handle empty string', () => {
      const result = formatLocation('');
      
      expect(result).toEqual({
        location: '',
        place: undefined,
      });
    });

    it('should handle location without place (no slash)', () => {
      const result = formatLocation('SEOUL');
      
      expect(result).toEqual({
        location: '서울',
        place: undefined,
      });
    });

    it('should handle location with empty place', () => {
      const result = formatLocation('SEOUL/');
      
      expect(result).toEqual({
        location: '서울',
        place: '',
      });
    });

    it('should handle multiple slashes', () => {
      const result = formatLocation('SEOUL/잠실/체육관');
      
      expect(result).toEqual({
        location: '서울',
        place: '잠실',
      });
    });

    it('should handle location starting with slash', () => {
      const result = formatLocation('/잠실체육관');
      
      expect(result).toEqual({
        location: '',
        place: '잠실체육관',
      });
    });

    it('should handle only slash', () => {
      const result = formatLocation('/');
      
      expect(result).toEqual({
        location: '',
        place: '',
      });
    });
  });

  describe('region code mapping', () => {
    it('should correctly map all known region codes', () => {
      const regionCodes = Object.keys(LocationLabels);
      
      regionCodes.forEach(code => {
        const result = formatLocation(`${code}/테스트장소`);
        expect(result.location).toBe(LocationLabels[code as keyof typeof LocationLabels]);
        expect(result.place).toBe('테스트장소');
      });
    });

    it('should be case sensitive for region codes', () => {
      const result = formatLocation('seoul/잠실체육관'); // lowercase
      
      expect(result).toEqual({
        location: 'seoul', // Should not be converted
        place: '잠실체육관',
      });
    });

    it('should handle region codes with extra spaces', () => {
      const result = formatLocation(' SEOUL /잠실체육관');
      
      expect(result).toEqual({
        location: ' SEOUL ', // Spaces preserved, no mapping found
        place: '잠실체육관',
      });
    });
  });

  describe('data integrity', () => {
    it('should not modify original string', () => {
      const originalLocation = 'SEOUL/잠실체육관';
      const originalLocationCopy = originalLocation;
      
      formatLocation(originalLocation);
      
      expect(originalLocation).toBe(originalLocationCopy);
    });

    it('should return new object each time', () => {
      const location = 'SEOUL/잠실체육관';
      const result1 = formatLocation(location);
      const result2 = formatLocation(location);
      
      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2);
    });

    it('should handle very long place names', () => {
      const longPlaceName = 'A'.repeat(1000);
      const result = formatLocation(`SEOUL/${longPlaceName}`);
      
      expect(result).toEqual({
        location: '서울',
        place: longPlaceName,
      });
    });

    it('should handle Unicode characters in place names', () => {
      const result = formatLocation('SEOUL/잠실체육관🏟️');
      
      expect(result).toEqual({
        location: '서울',
        place: '잠실체육관🏟️',
      });
    });
  });
});