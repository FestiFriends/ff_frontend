# 🏷️ HashtagBadge 컴포넌트

공통적으로 사용 가능한 **해시태그 배지 UI 컴포넌트**입니다.  
모임, 유저, 카드 등 다양한 맥락에서 스타일별로 구분된 태그를 보여줄 수 있으며, 클릭 이벤트도 지원합니다.

---

## 📦 사용법

```tsx
import HashtagBadge from '@/components/HashtagBadge';

<HashtagBadge
  text='모임카드'
  isClickable
  onClick={(tag, e) => {
    e?.preventDefault();
    console.log(`${tag} 배지를 클릭했어요`);
  }}
  className='bg-blue-100 text-blue-600'
/>;
```

## ✨ Props

| 이름          | 타입                                                              | 기본값       | 설명                                                          |
| ------------- | ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------- |
| `text`        | `string`                                                          | (필수)       | 배지에 표시될 텍스트. `#` 포함 여부는 호출부에서 제어         |
| `isClickable` | `boolean`                                                         | `false`      | 클릭 가능한 배지인지 여부                                     |
| `onClick`     | `(text: string, e?: React.MouseEvent<HTMLButtonElement>) => void` | `undefined`  | 클릭 시 실행될 핸들러. `isClickable=true`일 때만 동작         |
| `className`   | `string`                                                          | `'bg-white'` | 사용자 정의 Tailwind CSS 클래스 (기본 스타일 확장/덮어쓰기용) |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 기본 클래스:
  rounded-full px-2.5 py-2 text-12_M text-gray-700

- 사용자 정의 클래스는 className을 통해 추가적으로 적용 가능
  예: bg-blue-100, font-bold, text-purple-600 등

- 클릭 가능한 경우 <button>으로, 클릭 불가능한 경우 <span>으로 렌더링됩니다.

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                    | 설명                                                                 |
| ------------------------------ | -------------------------------------------------------------------- |
| 텍스트 렌더링 테스트           | `text`가 화면에 정상적으로 표시되는지 확인                           |
| 스타일 클래스 적용 테스트      | `className`으로 전달한 클래스가 적용되는지 확인                      |
| onClick 핸들러 실행 테스트     | `isClickable=true`일 때 클릭 시 `onClick(text, e)`가 호출되는지 확인 |
| 클릭 비활성화 테스트           | `isClickable=false`일 때 클릭해도 `onClick`이 호출되지 않는지 확인   |
| 핸들러 미지정 시 안정성 테스트 | `onClick`이 없더라도 클릭 시 에러 없이 동작하는지 확인               |
| 버튼/스팬 태그 조건부 렌더링   | `isClickable` 여부에 따라 button 또는 span 태그로 렌더링되는지 확인  |

## 📁 파일 구조

```
/components/HashtagBadge
  ├── HashtagBadge.md
  ├── HashtagBadge.test.tsx
  └── HashtagBadge.tsx
```
