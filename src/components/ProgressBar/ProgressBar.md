# 🏷️ ProgressBar 컴포넌트

모집 인원 대비 현재 참여 인원의 비율을 시각적으로 보여주는 공용 UI 컴포넌트입니다.
스크롤에 의해 화면에 등장할 때 애니메이션 효과로 진행률이 표시되며, 접근성 속성도 함께 적용됩니다.

---

## 📦 사용법

```tsx
import ProgressBar from '@/components/ProgressBar';

<ProgressBar current={7} total={10} />
<ProgressBar current={5} total={10} shouldAnimate={false} />
<ProgressBar current={8} total={10} className="my-2" />
```

## ✨ Props

| 이름            | 타입      | 필수 | 설명                                                        |
| --------------- | --------- | ---- | ----------------------------------------------------------- |
| `current`       | `number`  | ✅   | 현재 참여 인원                                              |
| `total`         | `number`  | ✅   | 총 모집 인원                                                |
| `shouldAnimate` | `boolean` | ❌   | 스크롤 진입 시 진행률 애니메이션 적용 여부 (기본값: `true`) |
| `className`     | `string`  | ❌   | 컴포넌트 외부 스타일링을 위한 Tailwind CSS 클래스           |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 전체 progress container: w-full, rounded-full, bg-gray-200, overflow-hidden

- 진행된 영역: bg-blue-500, transition-all duration-1000 ease-in-out (애니메이션 옵션일 때)

- 접근성: role="progressbar", aria-valuemin, aria-valuemax, aria-valuenow 등 설정

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react, react-intersection-observer

| 테스트 항목                 | 설명                                                                   |
| --------------------------- | ---------------------------------------------------------------------- |
| 애니메이션 작동 여부 테스트 | `shouldAnimate`이 true일 때 transition 클래스가 존재하는지 확인        |
| 애니메이션 비활성화 테스트  | `shouldAnimate`이 false일 때 transition 클래스가 제거되는지 확인       |
| 진행률 정확성 테스트        | `current / total` 비율이 `aria-valuenow` 속성에 정확히 반영되는지 확인 |
| 최대/최소 경계값 테스트     | 0% 이하, 100% 이상으로 넘지 않도록 `Math.min`/`Math.max`로 제한 확인   |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

## 📁 파일 구조

```
/components/ProgressBar/
  ├── ProgressBar.tsx
  ├── ProgressBar.test.tsx
  └── ProgressBar.md
```
