# 🏷️ ProgressBar 컴포넌트

모집 인원 대비 현재 참여 인원의 비율을 시각적으로 보여주는 공용 UI 컴포넌트입니다.
화면에 보이기 시작하면 애니메이션 효과와 함께 진행률이 표시되며, 접근성을 위한 속성도 포함됩니다.

---

## 📦 사용법

```tsx
import ProgressBar from '@/components/ProgressBar';

<ProgressBar current={7} total={10} />
<ProgressBar current={5} total={10} shouldAnimate={false} />
<ProgressBar current={8} total={10} className="my-2" />
```

## ✨ Props

| 이름            | 타입      | 필수 | 설명                                                               |
| --------------- | --------- | ---- | ------------------------------------------------------------------ |
| `current`       | `number`  | ✅   | 현재 참여 인원                                                     |
| `total`         | `number`  | ✅   | 총 모집 인원                                                       |
| `shouldAnimate` | `boolean` | ❌   | 애니메이션 여부 (`true`일 경우 inView 시 진행률이 부드럽게 표시됨) |
| `className`     | `string`  | ❌   | 외부에서 Tailwind로 스타일을 덮어쓸 수 있는 클래스명               |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- Wrapper: flex w-full flex-col gap-2

- 진행 텍스트: text-12_M text-gray-700

- 기본 배경 바: h-1 w-full overflow-hidden rounded-md bg-gray-100

- 진행률 바

  - 기본: h-full rounded-md bg-primary-red

  - 애니메이션: transition-all duration-1000 ease-in-out

- 접근성 속성

  - role="progressbar"

  - aria-valuemin={0}

  - aria-valuemax={100}

  - aria-valuenow={Math.round(percent)}

  - aria-label="모집 인원 진행률"

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react, react-intersection-observer

| 테스트 항목                  | 설명                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| 애니메이션 작동 여부 테스트  | `shouldAnimate`이 `true`일 때 transition 클래스가 존재하는지 확인    |
| 애니메이션 비활성화 테스트   | `false`일 때 transition 클래스가 없는지 확인                         |
| 진행률 계산 테스트           | `current / total` 비율이 `aria-valuenow`에 정확히 반영되는지 확인    |
| 음수 방지 테스트             | `current`가 음수일 때도 `aria-valuenow`가 0 이상으로 제한되는지 확인 |
| 최대치 제한 테스트           | `current > total`이어도 `aria-valuenow`가 100을 넘지 않는지 확인     |
| total이 0인 경우 테스트      | 분모가 0일 때 진행률을 100%로 간주하는지 확인                        |
| 인원 수 텍스트 렌더링 테스트 | `({current}/{total}명)` 텍스트가 화면에 정확히 출력되는지 확인       |

## 📁 파일 구조

```
/components/ProgressBar/
  ├── ProgressBar.md
  ├── ProgressBar.test.tsx
  └── ProgressBar.tsx
```
