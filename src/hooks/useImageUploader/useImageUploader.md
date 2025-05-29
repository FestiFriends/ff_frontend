# useImageUploader Hook

React에서 이미지 업로드를 간편하게 처리할 수 있는 커스텀 훅입니다.  
단일 이미지 또는 다중 이미지 업로드를 지원하며, URL 기반 이미지 불러오기, 이미지 삭제, 초기화 기능도 포함되어 있습니다.

---

## 주요 기능

- 단일(`single`) / 다중(`multi`) 이미지 업로드 지원
- 이미지 파일 배열, FileList 또는 단일 File 객체 모두 처리 가능
- 외부 URL로부터 이미지 파일 불러오기 (blob 다운로드 후 File 객체 변환)
- 이미지 리스트 관리 및 삭제, 초기화 기능 제공
- 업로드된 이미지에 대한 URL 생성 (`URL.createObjectURL` 사용)

---

## 타입

```ts
interface UploadedImage {
  file: File; // 실제 파일 객체
  url: string; // 파일을 참조하는 URL
}
```

---

## 사용법

```tsx
const {
  images, // single: UploadedImage | undefined, multi: UploadedImage[]
  upload, // 이미지 파일 업로드 함수
  remove, // 인덱스 기반 이미지 삭제 함수
  reset, // 이미지 초기화 함수
  defaultUrlUpload, // URL로부터 이미지 업로드 함수 (비동기)
} = useImageUploader('single' | 'multi');
```

- type: 'single' 또는 'multi'로 업로드 모드 지정
  - 'single': 하나의 이미지 관리 (images는 단일 UploadedImage 또는 undefined)
  - 'multi': 여러 이미지 관리 (images는 UploadedImage 배열)

---

## 함수 설명

| 함수명             | 설명                                                                       | 파라미터                             | 반환값   |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------------ | -------- |
| `upload`           | 파일 객체(단일, 배열, FileList)로부터 이미지를 업로드하고 상태에 저장      | `File \| File[] \| FileList \| null` | `File[]` |
| `remove`           | 특정 인덱스의 이미지를 삭제 (single 타입이면 무조건 초기화)                | `index: number`                      | `void`   |
| `reset`            | 모든 이미지를 초기화                                                       |                                      | `void`   |
| `defaultUrlUpload` | 외부 URL 배열 또는 단일 URL을 받아 Blob을 다운로드 후 File로 변환해 업로드 | `urls: string[] \| string`           | `string` |

---

## 예시 코드

```tsx
'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useImageUploader } from '@/hooks/useImageUploader/useImageUploader';

const Test = () => {
  const { images, upload, defaultUrlUpload, remove, reset } =
    useImageUploader('single');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    defaultUrlUpload([
      'https://fastly.picsum.photos/id/395/300/200.jpg?hmac=5TOwN2UiC9S3zjcgZZPJI-qGmjcw5f1rlQsSVY8XDbM',
    ]);
  }, [defaultUrlUpload]);

  return (
    <div>
      <button onClick={() => inputRef.current?.click()}>이미지 업로드</button>
      <button onClick={reset}>초기화</button>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        className='hidden'
        onChange={(e) => {
          upload(e.target.files);
          e.target.value = '';
        }}
      />
      {images && (
        <div
          key={images.url}
          className='relative h-48 w-48'
          onClick={() => remove()}
        >
          <Image
            src={images.url}
            alt='이미지'
            fill
          />
        </div>
      )}
    </div>
  );
};

export default Test;
```

```tsx
'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useImageUploader } from '@/hooks/useImageUploader/useImageUploader';

const Test = () => {
  const { images, upload, defaultUrlUpload, remove, reset } =
    useImageUploader('multi');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    defaultUrlUpload([
      'https://fastly.picsum.photos/id/395/300/200.jpg?hmac=5TOwN2UiC9S3zjcgZZPJI-qGmjcw5f1rlQsSVY8XDbM',
      'https://fastly.picsum.photos/id/376/600/400.jpg?hmac=GPnA8MlGgmv0s9ZOXE1G9D6VM9ejsLiGUWmnD-GdT-s',
    ]);
  }, [defaultUrlUpload]);

  return (
    <div>
      <button onClick={() => inputRef.current?.click()}>이미지 업로드</button>
      <button onClick={reset}>초기화</button>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        className='hidden'
        onChange={(e) => {
          upload(e.target.files);
          e.target.value = '';
        }}
        multiple
      />
      {images.map((img, idx) => (
        <div
          key={img.url}
          className='relative h-48 w-48'
          onClick={() => remove(idx)}
        >
          <Image
            src={img.url}
            alt='이미지'
            fill
          />
        </div>
      ))}
    </div>
  );
};

export default Test;
```

---

## 주의 사항: 동일 파일 재선택 시 `onChange` 이벤트 미발생 문제

`<input type="file" />` 요소에서 동일한 파일을 연속으로 선택할 경우, 브라우저는 `onChange` 이벤트를 발생시키지 않습니다.  
이로 인해 같은 파일을 다시 업로드하려 해도 이벤트가 동작하지 않아 이미지가 업데이트되지 않는 문제가 발생할 수 있습니다.

### 문제 발생 상황

- 사용자가 이미 업로드했던 파일과 동일한 파일을 다시 선택했을 때
- `onChange` 핸들러가 호출되지 않아 `upload` 함수가 실행되지 않음

### 해결 방법

`onChange` 이벤트 내에서 파일 선택 값을 강제로 초기화하여, 같은 파일을 선택해도 항상 이벤트가 발생하도록 만듭니다.

```tsx
<input
  type='file'
  accept='image/*'
  ref={inputRef}
  className='hidden'
  onChange={(e) => {
    upload(e.target.files);
    e.target.value = ''; // 동일 파일 선택 시에도 이벤트 발생하도록 초기화
  }}
  multiple
/>
```
