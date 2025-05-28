import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useImageUploader } from './useImageUploader';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'mock-url');
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('useImageUploader(type:single) 테스트', () => {
  test('초기 상태는 undefined이어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('single'));

    expect(result.current.images).toStrictEqual(undefined);
  });

  test('기본 URL 업로드', async () => {
    const blob = new Blob(['img'], { type: 'image/png' });
    mockedAxios.get.mockResolvedValue({ data: blob });

    const { result } = renderHook(() => useImageUploader('single'));

    await act(async () => {
      await result.current.defaultUrlUpload(['https://example.com/img1.png']);
    });

    expect(result.current.images?.url).toBe('https://example.com/img1.png');
  });

  test('여러 개의 파일을 업로드하면 첫번째 이미지만 추가되어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('single'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual({
      file: file1,
      url: 'mock-url',
    });
  });

  test('단일 File 객체도 정상적으로 업로드되어야 함', () => {
    const { result } = renderHook(() => useImageUploader('single'));

    const file = new File(['file'], 'file.png', { type: 'image/png' });

    act(() => {
      result.current.upload(file);
    });

    expect(result.current.images).toStrictEqual({
      file,
      url: 'mock-url',
    });
  });

  test('upload 함수에 null을 전달하면 아무 작업도 하지 않아야 한다', () => {
    const { result } = renderHook(() => useImageUploader('single'));

    act(() => {
      result.current.upload(null);
    });

    expect(result.current.images).toStrictEqual(undefined);
  });

  test('remove 호출 시 이미지가 제거되어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('single'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual({
      file: file1,
      url: 'mock-url',
    });

    act(() => {
      result.current.remove();
    });

    expect(result.current.images).toStrictEqual(undefined);
  });

  test('reset 호출 시 이미지가 제거되어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('single'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual({
      file: file1,
      url: 'mock-url',
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.images).toStrictEqual(undefined);
  });

  test('지원하지 않는 MIME 타입은 기본 확장자 jpg를 사용해야 함', async () => {
    const blob = new Blob(['img'], { type: 'abc/abc' });
    mockedAxios.get.mockResolvedValue({ data: blob });

    const { result } = renderHook(() => useImageUploader('single'));

    await act(async () => {
      await result.current.defaultUrlUpload([
        'https://example.com/unsupported.svg',
      ]);
    });

    const uploaded = result.current.images;

    expect(uploaded?.file.name.endsWith('.jpg')).toBe(true);
  });
});

describe('useImageUploader(type:multi) 테스트', () => {
  test('초기 상태는 빈 배열이어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('multi'));

    expect(result.current.images).toStrictEqual([]);
  });

  test('기본 URL 업로드', async () => {
    const blob = new Blob(['img'], { type: 'image/png' });
    mockedAxios.get.mockResolvedValue({ data: blob });

    const { result } = renderHook(() => useImageUploader('multi'));

    await act(async () => {
      await result.current.defaultUrlUpload([
        'https://example.com/img1.png',
        'https://example.com/img2.png',
      ]);
    });

    expect(result.current.images).toHaveLength(2);
    expect(result.current.images[0].url).toBe('https://example.com/img1.png');
    expect(result.current.images[1].url).toBe('https://example.com/img2.png');
  });

  test('잘못된 URL로 실패한 경우 null이 필터링되어야 함', async () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedAxios.get.mockRejectedValueOnce(new Error('404 Not Found'));

    const blob = new Blob(['img'], { type: 'image/png' });
    mockedAxios.get.mockResolvedValueOnce({ data: blob });

    const { result } = renderHook(() => useImageUploader('multi'));

    await act(async () => {
      await result.current.defaultUrlUpload([
        'https://aaaaa.com/img.png',
        'https://example.com/img1.png',
      ]);
    });

    expect(result.current.images).toHaveLength(1);
    expect(result.current.images[0].url).toBe('https://example.com/img1.png');
    consoleErrorMock.mockRestore();
  });

  test('여러 개의 파일을 업로드하면 모두 추가되어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('multi'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual([
      { file: file1, url: 'mock-url' },
      { file: file2, url: 'mock-url' },
      { file: file3, url: 'mock-url' },
    ]);
  });

  test('upload 함수에 null을 전달하면 아무 작업도 하지 않아야 한다', () => {
    const { result } = renderHook(() => useImageUploader('multi'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual([
      { file: file1, url: 'mock-url' },
      { file: file2, url: 'mock-url' },
      { file: file3, url: 'mock-url' },
    ]);

    act(() => {
      result.current.upload(null);
    });

    expect(result.current.images).toStrictEqual([
      { file: file1, url: 'mock-url' },
      { file: file2, url: 'mock-url' },
      { file: file3, url: 'mock-url' },
    ]);
  });

  test('특정 인덱스의 이미지를 삭제할 수 있어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('multi'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual([
      { file: file1, url: 'mock-url' },
      { file: file2, url: 'mock-url' },
      { file: file3, url: 'mock-url' },
    ]);

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.images).toStrictEqual([
      { file: file1, url: 'mock-url' },
      { file: file3, url: 'mock-url' },
    ]);
  });

  test('reset 호출 시 모든 이미지가 제거되어야 한다', () => {
    const { result } = renderHook(() => useImageUploader('multi'));

    const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
    const file3 = new File(['file3'], 'file3.png', { type: 'image/png' });

    act(() => {
      result.current.upload([file1, file2, file3]);
    });

    expect(result.current.images).toStrictEqual([
      { file: file1, url: 'mock-url' },
      { file: file2, url: 'mock-url' },
      { file: file3, url: 'mock-url' },
    ]);

    act(() => {
      result.current.reset();
    });

    expect(result.current.images).toStrictEqual([]);
  });
});
