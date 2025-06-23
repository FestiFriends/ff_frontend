import { renderHook, act } from '@testing-library/react';
import useQueryParam from './useQueryParam';

const mockSearchParams = new URLSearchParams();
const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const mockLocation = {
  pathname: '/test-path',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('useQueryParam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.forEach((value, key) => {
      mockSearchParams.delete(key);
    });
    mockLocation.pathname = '/test-path';
  });

  describe('getQueryParam', () => {
    it('존재하는 쿼리 파라미터를 반환한다', () => {
      mockSearchParams.set('title', 'test-title');
      mockSearchParams.set('category', 'music');

      const { result } = renderHook(() => useQueryParam());

      expect(result.current.getQueryParam('title')).toBe('test-title');
      expect(result.current.getQueryParam('category')).toBe('music');
    });

    it('존재하지 않는 쿼리 파라미터에 대해 null을 반환한다', () => {
      const { result } = renderHook(() => useQueryParam());

      expect(result.current.getQueryParam('nonexistent')).toBeNull();
    });
  });

  describe('setQueryParam', () => {
    it('새로운 쿼리 파라미터를 설정한다', () => {
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', 'new-title');
      });

      expect(mockReplace).toHaveBeenCalledWith('/test-path?title=new-title');
    });

    it('기존 쿼리 파라미터를 업데이트한다', () => {
      mockSearchParams.set('title', 'old-title');
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', 'new-title');
      });

      expect(mockReplace).toHaveBeenCalledWith('/test-path?title=new-title');
    });

    it('빈 값으로 설정하면 파라미터를 삭제한다', () => {
      mockSearchParams.set('title', 'test-title');
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', '');
      });

      expect(mockReplace).toHaveBeenCalledWith('/test-path?');
    });

    it('anchor가 제공되면 URL에 포함한다', () => {
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', 'test-title', 'section1');
      });

      expect(mockReplace).toHaveBeenCalledWith(
        '/test-path?title=test-title#section1'
      );
    });

    it('여러 개의 기존 파라미터가 있을 때 하나만 업데이트한다', () => {
      mockSearchParams.set('title', 'test-title');
      mockSearchParams.set('category', 'music');
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', 'new-title');
      });

      const expectedUrl = '/test-path?title=new-title&category=music';
      expect(mockReplace).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('setMultipleQueryParams', () => {
    it('여러 개의 쿼리 파라미터를 동시에 설정한다', () => {
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setMultipleQueryParams({
          title: 'test-title',
          category: 'music',
          location: 'seoul',
        });
      });

      const url = mockReplace.mock.calls[0][0];
      expect(url).toContain('title=test-title');
      expect(url).toContain('category=music');
      expect(url).toContain('location=seoul');
    });

    it('null 값으로 설정하면 해당 파라미터를 삭제한다', () => {
      mockSearchParams.set('title', 'test-title');
      mockSearchParams.set('category', 'music');
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setMultipleQueryParams({
          title: null,
          location: 'seoul',
        });
      });

      const url = mockReplace.mock.calls[0][0];
      expect(url).not.toContain('title=');
      expect(url).toContain('category=music');
      expect(url).toContain('location=seoul');
    });

    it('빈 문자열로 설정하면 해당 파라미터를 삭제한다', () => {
      mockSearchParams.set('title', 'test-title');
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setMultipleQueryParams({
          title: '',
          category: 'music',
        });
      });

      const url = mockReplace.mock.calls[0][0];
      expect(url).not.toContain('title=');
      expect(url).toContain('category=music');
    });
  });

  describe('clearAllParams', () => {
    it('모든 쿼리 파라미터를 제거한다', () => {
      mockSearchParams.set('title', 'test-title');
      mockSearchParams.set('category', 'music');
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.clearAllParams();
      });

      expect(mockReplace).toHaveBeenCalledWith('/test-path');
    });
  });

  describe('getPerformanceQueryString', () => {
    it('기본 파라미터와 함께 쿼리 스트링을 생성한다', () => {
      const { result } = renderHook(() => useQueryParam());

      const queryString = result.current.getPerformanceQueryString();

      expect(queryString).toContain('page=1');
      expect(queryString).toContain('size=20');
    });

    it('기존 쿼리 파라미터를 포함한다', () => {
      mockSearchParams.set('title', 'test-title');
      mockSearchParams.set('category', 'music');
      const { result } = renderHook(() => useQueryParam());

      const queryString = result.current.getPerformanceQueryString();

      expect(queryString).toContain('title=test-title');
      expect(queryString).toContain('category=music');
      expect(queryString).toContain('page=1');
      expect(queryString).toContain('size=20');
    });

    it('추가 파라미터로 기존 값을 덮어쓴다', () => {
      mockSearchParams.set('page', '5');
      mockSearchParams.set('title', 'old-title');
      const { result } = renderHook(() => useQueryParam());

      const queryString = result.current.getPerformanceQueryString({
        title: 'new-title',
        category: 'theater',
      });

      expect(queryString).toContain('title=new-title');
      expect(queryString).toContain('category=theater');
      expect(queryString).toContain('page=5');
    });

    it('빈 값이나 공백만 있는 값은 필터링한다', () => {
      const { result } = renderHook(() => useQueryParam());

      const queryString = result.current.getPerformanceQueryString({
        title: '',
        category: '   ',
        location: 'seoul',
        keyword: undefined,
      });

      expect(queryString).not.toContain('title=');
      expect(queryString).not.toContain('category=');
      expect(queryString).not.toContain('keyword=');
      expect(queryString).toContain('location=seoul');
    });

    it('기본 page와 size가 없을 때 DEFAULT 값을 사용한다', () => {
      const { result } = renderHook(() => useQueryParam());

      const queryString = result.current.getPerformanceQueryString();

      expect(queryString).toContain('page=1');
      expect(queryString).toContain('size=20');
    });

    it('모든 Performance 쿼리 파라미터 타입을 처리한다', () => {
      mockSearchParams.set('title', 'test-title');
      mockSearchParams.set('keyword', 'test-keyword');
      mockSearchParams.set('category', 'music');
      mockSearchParams.set('startDate', '2023-01-01');
      mockSearchParams.set('endDate', '2023-12-31');
      mockSearchParams.set('location', 'seoul');
      mockSearchParams.set('sort', 'latest');
      mockSearchParams.set('visit', 'true');
      mockSearchParams.set('isExpired', 'false');

      const { result } = renderHook(() => useQueryParam());

      const queryString = result.current.getPerformanceQueryString();

      expect(queryString).toContain('title=test-title');
      expect(queryString).toContain('keyword=test-keyword');
      expect(queryString).toContain('category=music');
      expect(queryString).toContain('startDate=2023-01-01');
      expect(queryString).toContain('endDate=2023-12-31');
      expect(queryString).toContain('location=seoul');
      expect(queryString).toContain('sort=latest');
      expect(queryString).toContain('visit=true');
      expect(queryString).toContain('isExpired=false');
    });
  });

  describe('통합 테스트', () => {
    it('여러 함수를 연속으로 사용할 수 있다', () => {
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', 'first-title');
      });

      act(() => {
        result.current.setMultipleQueryParams({
          category: 'music',
          location: 'seoul',
        });
      });

      const queryString = result.current.getPerformanceQueryString({
        sort: 'latest',
      });

      expect(queryString).toContain('sort=latest');
      expect(queryString).toContain('page=1');
      expect(queryString).toContain('size=20');
    });

    it('URL 인코딩이 필요한 값들을 올바르게 처리한다', () => {
      const { result } = renderHook(() => useQueryParam());

      act(() => {
        result.current.setQueryParam('title', '한글 제목');
      });

      const calls = mockReplace.mock.calls;
      expect(calls[calls.length - 1][0]).toContain(
        'title=%ED%95%9C%EA%B8%80+%EC%A0%9C%EB%AA%A9'
      );
    });
  });
});
